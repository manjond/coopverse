import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/**
 * Singleton Drizzle client backed by Neon's HTTP transport. We use the
 * HTTP driver (not the websocket one) because Cloudflare Pages serverless
 * functions don't keep long-lived TCP connections — HTTP works
 * unconditionally and Neon's edge cache absorbs the overhead.
 */
// Defer validation to query-time — Next.js imports this module during
// build even for force-dynamic routes (to collect page metadata).
// Passing a placeholder avoids a module-init throw; neon() only connects
// when a query is actually executed at runtime.
const url = process.env.DATABASE_URL ?? '';

const sql = neon(url || 'postgresql://localhost/placeholder');
export const db = drizzle({ client: sql, schema });

export function assertDatabaseUrl() {
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.',
    );
  }
}
