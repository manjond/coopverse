import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

async function run() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
      email text UNIQUE NOT NULL,
      name text NOT NULL,
      password_hash text NOT NULL,
      avatar_url text,
      created_at timestamp DEFAULT now() NOT NULL
    )
  `;
  // Migrate favorites/ratings foreign key to use our user IDs
  // (existing Clerk IDs will be orphaned — that's fine, no real users yet)
  console.log('✓ users table ready');
}
run().catch(console.error);
