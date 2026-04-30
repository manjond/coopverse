import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Single-admin cookie auth — minimal but resistant to cookie tampering.
 * Cookie value = `${ts}.${hmac(ts, ADMIN_PASSWORD)}` where ts is unix ms.
 * On verify we recompute the HMAC and compare timing-safely; cookies
 * older than 30 days are rejected so a stolen value eventually expires.
 *
 * Caveats:
 *   - Single shared admin (no per-user accounts).
 *   - If you rotate ADMIN_PASSWORD, all sessions invalidate.
 *   - For multi-admin setups, swap this for Clerk roles in Step 17/19.
 */

const COOKIE_NAME = 'coopverse_admin';
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function secret(): string {
  const s = process.env.ADMIN_PASSWORD;
  if (!s) throw new Error('ADMIN_PASSWORD env var is not set');
  return s;
}

function sign(ts: string): string {
  return createHmac('sha256', secret()).update(ts).digest('hex');
}

export function makeCookieValue(): string {
  const ts = String(Date.now());
  return `${ts}.${sign(ts)}`;
}

/** Returns true iff the cookie is present, untampered, and not too old. */
export async function isAdmin(): Promise<boolean> {
  const c = (await cookies()).get(COOKIE_NAME)?.value;
  if (!c) return false;
  const [ts, sig] = c.split('.');
  if (!ts || !sig) return false;
  const age = Date.now() - Number(ts);
  if (Number.isNaN(age) || age < 0 || age > MAX_AGE_MS) return false;
  const expected = sign(ts);
  try {
    return timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  if (!input) return false;
  const expected = secret();
  if (input.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(input), Buffer.from(expected));
}

export const ADMIN_COOKIE = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE_S = Math.floor(MAX_AGE_MS / 1000);
