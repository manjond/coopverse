import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);
async function run() {
  await sql`DELETE FROM games WHERE slug = 'narrow-one'`;
  // Also unfeature it if it was featured, replace with next best
  await sql`UPDATE games SET featured = true WHERE slug = 'zombs-io'`;
  console.log('✓ narrow-one removed, zombs-io featured instead');
}
run().catch(console.error);
