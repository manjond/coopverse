import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

async function run() {
  // stickman-duelist-2: game no longer available on CrazyGames
  // slither-io: mixed content (serves HTTP resources inside HTTPS page)
  await sql`DELETE FROM games WHERE slug IN ('stickman-duelist-2', 'slither-io')`;
  console.log('✓ Removed broken games');

  // Update categories to be more comprehensive
  await sql`UPDATE games SET category_slugs = ARRAY['multijugador','cooperativos'] WHERE slug = 'diep-io'`;
  await sql`UPDATE games SET category_slugs = ARRAY['multijugador'] WHERE slug IN ('krunker-io','splix-io','paper-io-2','shell-shockers','wormate-io','surviv-io')`;
  await sql`UPDATE games SET category_slugs = ARRAY['dos-jugadores','multijugador'] WHERE slug IN ('getaway-shootout','rooftop-snipers')`;
  await sql`UPDATE games SET category_slugs = ARRAY['cooperativos','multijugador','plataformas','cuatro-jugadores'] WHERE slug = 'wobble-park'`;
  console.log('✓ Categories updated');
}
run().catch(console.error);
