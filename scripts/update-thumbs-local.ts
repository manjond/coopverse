import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

async function run() {
  // Use local SVG thumbnails (always work, no external CDN dependency)
  const updates: Record<string, string> = {
    'wobble-park':      '/thumbs/wobble-park.svg',
    'krunker-io':       '/thumbs/krunker-io.svg',
    'diep-io':          '/thumbs/diep-io.svg',
    'splix-io':         '/thumbs/splix-io.svg',
    'paper-io-2':       '/thumbs/paper-io-2.svg',
    'shell-shockers':   '/thumbs/shell-shockers.svg',
    'wormate-io':       '/thumbs/wormate-io.svg',
    'surviv-io':        '/thumbs/surviv-io.svg',
    'getaway-shootout': '/thumbs/getaway-shootout.svg',
    'rooftop-snipers':  '/thumbs/rooftop-snipers.svg',
  };

  for (const [slug, url] of Object.entries(updates)) {
    await sql`UPDATE games SET thumb_url = ${url} WHERE slug = ${slug}`;
    console.log(`✓ ${slug}`);
  }

  // Add new CrazyGames 2-player games found in research
  const newGames = [
    {
      slug: 'house-of-hazards',
      title_es: 'House of Hazards', title_en: 'House of Hazards',
      tagline_es: 'Vive en la misma casa y sobrevive a las trampas de tu compañero.',
      tagline_en: 'Live in the same house and survive your roommate\'s traps.',
      description_es: 'House of Hazards es un caótico juego cooperativo/competitivo para 2-4 jugadores en el mismo teclado. Completa tareas domésticas mientras tu compañero de casa activa trampas para impedírtelo: tuberías que explotan, ventiladores, tostadoras... La casa más peligrosa del mundo.',
      description_en: 'House of Hazards is a chaotic co-op/competitive game for 2-4 players on the same keyboard. Complete household chores while your roommate activates traps to stop you: exploding pipes, fans, toasters... The most dangerous house in the world.',
      instructions_es: 'Jugador 1: WASD + F. Jugador 2: Flechas + L. Jugador 3: IJKL + H. Jugador 4: Numpad.',
      instructions_en: 'Player 1: WASD + F. Player 2: Arrows + L. Player 3: IJKL + H. Player 4: Numpad.',
      embed_url: 'https://www.crazygames.com/embed/house-of-hazards',
      thumb_url: '/thumbs/house-of-hazards.svg',
      min_players: 2, max_players: 4,
      category_slugs: ['cooperativos', 'dos-jugadores', 'multijugador'],
    },
    {
      slug: 'ragdoll-archers',
      title_es: 'Ragdoll Archers', title_en: 'Ragdoll Archers',
      tagline_es: 'Duelo de arqueros ragdoll para 2 jugadores.',
      tagline_en: '2-player ragdoll archer duel.',
      description_es: 'Controla un arquero con físicas ragdoll y elimina a tu rival a flechazos. La física impredecible de los personajes hace que cada partida sea diferente. Modo 2 jugadores en el mismo teclado o contra la IA.',
      description_en: 'Control a ragdoll archer and eliminate your rival with arrows. The unpredictable ragdoll physics make every match different. 2-player mode on the same keyboard or vs AI.',
      instructions_es: 'Jugador 1: A/D mover, W disparar. Jugador 2: Flechas izq/der, arriba disparar.',
      instructions_en: 'Player 1: A/D move, W shoot. Player 2: Left/right arrows move, up arrow shoot.',
      embed_url: 'https://www.crazygames.com/embed/ragdoll-archers',
      thumb_url: '/thumbs/ragdoll-archers.svg',
      min_players: 1, max_players: 2,
      category_slugs: ['dos-jugadores', 'multijugador'],
    },
    {
      slug: 'tag-2-3-4-players',
      title_es: 'Tag 2 3 4 Players', title_en: 'Tag 2 3 4 Players',
      tagline_es: 'El juego del pillado para 2, 3 o 4 jugadores en el mismo teclado.',
      tagline_en: 'Tag game for 2, 3 or 4 players on the same keyboard.',
      description_es: 'El clásico juego del pilla-pilla en versión digital para hasta 4 jugadores. Cada jugador controla su personaje con teclas distintas. El que lleva la "mancha" tiene que tocar a otro. Simple, inmediato y muy divertido para grupos.',
      description_en: 'Classic tag game in digital version for up to 4 players. Each player controls their character with different keys. The one who is "it" must tag another player. Simple, immediate and great fun for groups.',
      instructions_es: 'Cada jugador usa un grupo de teclas diferente. Se indica en pantalla al empezar.',
      instructions_en: 'Each player uses a different set of keys. Shown on screen at the start.',
      embed_url: 'https://www.crazygames.com/embed/tag-2-3-4-players',
      thumb_url: '/thumbs/tag-players.svg',
      min_players: 2, max_players: 4,
      category_slugs: ['cooperativos', 'dos-jugadores', 'multijugador', 'cuatro-jugadores'],
    },
    {
      slug: '8-ball-billiards',
      title_es: 'Billar 8 Bolas', title_en: '8 Ball Billiards',
      tagline_es: 'Billar clásico a 8 bolas para 2 jugadores online.',
      tagline_en: 'Classic 8-ball billiards for 2 players online.',
      description_es: 'Billar a 8 bolas con física realista. Juega online contra otro jugador o contra la IA. Controles intuitivos de apuntado y fuerza. Reglas clásicas del billar americano. Funciona perfectamente en móvil y PC.',
      description_en: 'Classic 8-ball billiards with realistic physics. Play online against another player or against AI. Intuitive aim and power controls. Standard American pool rules. Works great on mobile and PC.',
      instructions_es: 'Haz clic y arrastra para apuntar. Ajusta la fuerza con el indicador. Suelta para golpear.',
      instructions_en: 'Click and drag to aim. Adjust power with the indicator. Release to shoot.',
      embed_url: 'https://www.crazygames.com/embed/8-ball-billiards-classic',
      thumb_url: '/thumbs/8-ball-billiards.svg',
      min_players: 1, max_players: 2,
      category_slugs: ['dos-jugadores', 'multijugador'],
    },
  ];

  for (const g of newGames) {
    await sql`
      INSERT INTO games (
        slug, source, featured, title_es, title_en, tagline_es, tagline_en,
        description_es, description_en, instructions_es, instructions_en,
        embed_url, thumb_url, min_players, max_players, category_slugs,
        plays_count, rating_avg, published_at, updated_at
      ) VALUES (
        ${g.slug}, 'manual', false, ${g.title_es}, ${g.title_en},
        ${g.tagline_es}, ${g.tagline_en}, ${g.description_es}, ${g.description_en},
        ${g.instructions_es}, ${g.instructions_en}, ${g.embed_url}, ${g.thumb_url},
        ${g.min_players}, ${g.max_players}, ${g.category_slugs},
        0, '0', NOW(), NOW()
      ) ON CONFLICT (slug) DO NOTHING
    `;
    console.log(`✓ added: ${g.slug}`);
  }
}

run().catch(console.error);
