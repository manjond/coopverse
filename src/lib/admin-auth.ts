import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Single-admin cookie auth — resistant to cookie tampering and timing attacks.
 * Cookie value = `${ts}.${hmac(ts, ADMIN_PASSWORD)}` where ts is unix ms.
 * On verify we recompute the HMAC and compare timing-safely; cookies
 * older than 30 days are rejected so a stolen value eventually expires.
 */

const COOKIE_NAME = 'coopverse_admin';
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const MIN_SECRET_LENGTH = 32;

function secret(): string {
  const s = process.env.ADMIN_PASSWORD?.trim();
  if (!s) throw new Error('ADMIN_PASSWORD env var is not set');
  if (
    process.env.NODE_ENV === 'production' &&
    (s.length < MIN_SECRET_LENGTH || s.toLowerCase().includes('change-me'))
  ) {
    throw new Error('ADMIN_PASSWORD must be a random 32+ character value in production');
  }
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

/**
 * Timing-safe password check.
 * Both inputs are hashed with HMAC-SHA256 before comparison so the buffers
 * are always the same length — eliminating the length-based timing leak that
 * would occur if we compared the raw strings or checked length first.
 */
export function checkPassword(input: string): boolean {
  if (!input) return false;
  const expected = secret();
  const salt = 'coopverse_pw_compare';
  const inputHash = createHmac('sha256', salt).update(input).digest();
  const expectedHash = createHmac('sha256', salt).update(expected).digest();
  return timingSafeEqual(inputHash, expectedHash);
}

export const ADMIN_COOKIE = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE_S = Math.floor(MAX_AGE_MS / 1000);
