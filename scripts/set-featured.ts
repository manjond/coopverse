import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

async function run() {
  // Reset all featured flags first
  await sql`UPDATE games SET featured = false`;
  // Mark the 4 top picks
  const picks = ['wobble-park', 'bonk-io', 'narrow-one', 'nightpoint-io'];
  for (const slug of picks) {
    await sql`UPDATE games SET featured = true WHERE slug = ${slug}`;
    console.log(`✓ featured: ${slug}`);
  }
}
run().catch(console.error);
