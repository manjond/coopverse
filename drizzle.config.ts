import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load .env.local first (dev), then fall back to .env (prod / shared).
config({ path: '.env.local' });
config({ path: '.env' });

/**
 * Drizzle CLI config. Used by `drizzle-kit push` (sync schema → DB) and
 * `drizzle-kit studio` (browser DB inspector). DATABASE_URL is read
 * from .env.local via dotenv/config.
 */
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
