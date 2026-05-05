import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const REF = 'https://coopverse.io';

const games = [
  {
    slug: 'battle-car-racing-2p',
    source: 'gd',
    title_es: 'Battle Car Racing 2 Jugadores',
    title_en: '2 Player Battle Car Racing',
    tagline_es: 'Carreras de coches locales para 2 jugadores en el mismo teclado.',
    tagline_en: 'Local car racing for 2 players on the same keyboard.',
    description_es: 'Elige tu coche y compite contra tu amigo en el mismo ordenador. Usa el teclado compartido para acelerar, frenar y adelantar. Ideal para partidas rápidas de 2 jugadores en local.',
    description_en: 'Pick your car and race your friend on the same computer. Share the keyboard to accelerate, brake and overtake. Perfect for quick 2-player local sessions.',
    instructions_es: 'Jugador 1: WASD. Jugador 2: Flechas del teclado.',
    instructions_en: 'Player 1: WASD. Player 2: Arrow keys.',
    embed_url: `https://html5.gamedistribution.com/61b7b8e7e9414c80997a2e72190407d2/?gd_sdk_referrer_url=${REF}`,
    thumb_url: '/thumbs/placeholder.svg',
    min_players: 2,
    max_players: 2,
    category_slugs: ['dos-jugadores', 'multijugador'],
    featured: false,
  },
  {
    slug: 'wacky-strike',
    source: 'gd',
    title_es: 'Wacky Strike',
    title_en: 'Wacky Strike',
    tagline_es: 'Shooter multijugador online frenético y lleno de caos.',
    tagline_en: 'Fast-paced online multiplayer shooter full of chaos.',
    description_es: 'Únete a partidas online de acción multijugador. Elige tu personaje, recoge armas y elimina a tus rivales en mapas locos llenos de obstáculos. Fácil de aprender, difícil de dominar.',
    description_en: 'Join online multiplayer action matches. Pick your character, grab weapons and eliminate rivals on crazy maps full of obstacles. Easy to learn, hard to master.',
    instructions_es: 'WASD para mover, ratón para apuntar y disparar. Recoge armas del suelo.',
    instructions_en: 'WASD to move, mouse to aim and shoot. Pick up weapons from the ground.',
    embed_url: `https://html5.gamedistribution.com/6c30cfc235744ec89ffd1d6658e07b22/?gd_sdk_referrer_url=${REF}`,
    thumb_url: '/thumbs/placeholder.svg',
    min_players: 2,
    max_players: 8,
    category_slugs: ['multijugador'],
    featured: false,
  },
  {
    slug: 'cs-online',
    source: 'gd',
    title_es: 'CS Online',
    title_en: 'CS Online',
    tagline_es: 'Shooter FPS multijugador online inspirado en Counter-Strike.',
    tagline_en: 'Online FPS multiplayer shooter inspired by Counter-Strike.',
    description_es: 'FPS multijugador online directamente en el navegador. Elige tu equipo, usa tu armamento y trabaja en equipo para ganar. Gráficos low-poly, acción intensa.',
    description_en: 'Online FPS multiplayer straight in your browser. Choose your team, use your arsenal and work together to win. Low-poly graphics, intense action.',
    instructions_es: 'WASD mover · Ratón apuntar · Click disparar · R recargar · Shift correr',
    instructions_en: 'WASD move · Mouse aim · Click shoot · R reload · Shift run',
    embed_url: `https://html5.gamedistribution.com/e8b30f50fe364d2389ef4668dac776f9/?gd_sdk_referrer_url=${REF}`,
    thumb_url: '/thumbs/placeholder.svg',
    min_players: 2,
    max_players: 16,
    category_slugs: ['multijugador'],
    featured: false,
  },
];

async function run() {
  for (const g of games) {
    await sql`
      INSERT INTO games (
        slug, source, featured,
        title_es, title_en,
        tagline_es, tagline_en,
        description_es, description_en,
        instructions_es, instructions_en,
        embed_url, thumb_url,
        min_players, max_players,
        category_slugs, plays_count, rating_avg,
        published_at, updated_at
      ) VALUES (
        ${g.slug}, ${g.source}, ${g.featured},
        ${g.title_es}, ${g.title_en},
        ${g.tagline_es}, ${g.tagline_en},
        ${g.description_es}, ${g.description_en},
        ${g.instructions_es}, ${g.instructions_en},
        ${g.embed_url}, ${g.thumb_url},
        ${g.min_players}, ${g.max_players},
        ${g.category_slugs}, 0, '0',
        NOW(), NOW()
      )
      ON CONFLICT (slug) DO NOTHING
    `;
    console.log(`✓ ${g.slug}`);
  }
  console.log('Done — verify embed URLs in /admin before going live');
}

run().catch(console.error);
