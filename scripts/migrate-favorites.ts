import { neon } from '@neondatabase/serverless';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL not set');

const sql = neon(url);

async function run() {
  await sql`
    CREATE TABLE IF NOT EXISTS "favorites" (
      "id" serial PRIMARY KEY NOT NULL,
      "user_id" varchar(64) NOT NULL,
      "game_slug" varchar(96) NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL
    )
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS "favorites_user_game_uniq"
    ON "favorites" USING btree ("user_id", "game_slug")
  `;

  console.log('✓ favorites table ready');
}

run().catch(console.error);
