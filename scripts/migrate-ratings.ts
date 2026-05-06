import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);
async function run() {
  await sql`
    CREATE TABLE IF NOT EXISTS ratings (
      id serial PRIMARY KEY,
      user_id varchar(64) NOT NULL,
      game_slug varchar(96) NOT NULL,
      stars integer NOT NULL CHECK (stars BETWEEN 1 AND 5),
      created_at timestamp DEFAULT now() NOT NULL
    )
  `;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS ratings_user_game_uniq ON ratings (user_id, game_slug)`;
  console.log('✓ ratings table ready');
}
run().catch(console.error);
