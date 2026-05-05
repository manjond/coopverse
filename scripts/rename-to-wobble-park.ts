import { neon } from '@neondatabase/serverless';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL not set');
const sql = neon(url);

async function run() {
  const description_es = `Wobble Park Online es un plataformero cooperativo donde uno a ocho jugadores resuelven puzles trabajando en equipo. Apílate sobre tus amigos para alcanzar plataformas más altas, sostén botones de presión mientras otros cruzan trampas, y supera lava, sierras de fuego y plataformas que se desmoronan. Son 45 niveles repartidos en 9 packs de dificultad ascendente — de Solo a Squad pasando por Duo. Ningún nivel exige instalación: abres el navegador, te unes a una sala con un código de 4 letras, y juegas.`;
  const description_en = `Wobble Park Online is a cooperative platformer where one to eight players solve puzzles together. Stack on your friends to reach higher platforms, hold pressure pads while teammates cross traps, and survive lava, fire bars and crumbling floors. 45 levels across 9 difficulty packs — Solo, Duo, Squad. No installs: open your browser, join a room with a 4-letter code, and play.`;

  await sql`
    UPDATE games SET
      slug           = 'wobble-park',
      title_es       = 'Wobble Park Online',
      title_en       = 'Wobble Park Online',
      tagline_es     = 'Plataformas cooperativas para 1 a 8 jugadores en navegador.',
      tagline_en     = 'Cooperative platformer puzzles for 1 to 8 players, in your browser.',
      description_es = ${description_es},
      description_en = ${description_en},
      updated_at     = NOW()
    WHERE slug = 'pikopark'
  `;

  // Update favorites that reference the old slug
  await sql`
    UPDATE favorites SET game_slug = 'wobble-park' WHERE game_slug = 'pikopark'
  `;

  console.log('✓ pikopark → wobble-park migration complete');
}

run().catch(console.error);
