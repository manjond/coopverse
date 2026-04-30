import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/**
 * Singleton Drizzle client backed by Neon's HTTP transport. We use the
 * HTTP driver (not the websocket one) because Cloudflare Pages serverless
 * functions don't keep long-lived TCP connections — HTTP works
 * unconditionally and Neon's edge cache absorbs the overhead.
 */
const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    'DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.',
  );
}

const sql = neon(url);
export const db = drizzle({ client: sql, schema });
