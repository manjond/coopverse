import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);
async function run() {
  await sql`DELETE FROM games WHERE slug = 'basketball-stars'`;
  console.log('✓ basketball-stars deleted');
}
run().catch(console.error);
