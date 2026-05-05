import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

async function run() {
  await sql`DELETE FROM games WHERE slug IN ('battle-car-racing-2p', 'wacky-strike', 'cs-online')`;
  console.log('✓ Removed broken GD games');
}
run().catch(console.error);
