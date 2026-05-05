import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function run() {
  await sql`
    UPDATE games
    SET embed_url  = 'https://pikopark-online-client.vercel.app',
        updated_at = NOW()
    WHERE slug = 'wobble-park'
  `;
  console.log('✓ embed_url fixed for wobble-park');
}

run().catch(console.error);
