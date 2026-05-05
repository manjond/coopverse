import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

const games = [
  {
    slug: 'zombs-io',
    title_es: 'Zombs.io', title_en: 'Zombs.io',
    tagline_es: 'Cooperativo online: construye tu base y defiéndela de los zombis.',
    tagline_en: 'Online co-op: build your base and defend it from zombies.',
    description_es: 'Zombs.io es un juego cooperativo de tower defense con salas online. Crea una sala, comparte el enlace con tus amigos y construid juntos una base para sobrevivir a oleadas de zombis cada vez más difíciles. Recolectad recursos, construid muros y torres, y defended vuestro núcleo. El único juego cooperativo de construcción y defensa completamente gratis en el navegador.',
    description_en: 'Zombs.io is a cooperative tower defense game with online rooms. Create a room, share the link with friends and build a base together to survive increasingly difficult zombie waves. Collect resources, build walls and towers, and defend your core.',
    instructions_es: 'Crea una sala o únete con código. WASD mover · Click izq atacar/construir · Z/X/C seleccionar torre · G recolectar recursos cercanos.',
    instructions_en: 'Create a room or join with code. WASD move · Left click attack/build · Z/X/C select tower · G collect nearby resources.',
    embed_url: 'https://zombs.io',
    thumb_url: '/thumbs/zombs-io.svg',
    min_players: 1, max_players: 20,
    category_slugs: ['cooperativos', 'multijugador'],
  },
  {
    slug: 'warbrokers-io',
    title_es: 'War Brokers', title_en: 'War Brokers',
    tagline_es: 'FPS de equipo online con salas privadas y múltiples modos.',
    tagline_en: 'Online team FPS with private rooms and multiple modes.',
    description_es: 'War Brokers es un shooter FPS en equipo con sala privada. Crea una sala, invita a tus amigos y competid 4v4 o más en múltiples modos: Team Deathmatch, Capture the Flag, Battle Royale. Gráficos low-poly pero con mecánicas de disparo sólidas. Completamente gratis en el navegador.',
    description_en: 'War Brokers is a team FPS with private rooms. Create a room, invite friends and compete 4v4+ in multiple modes: Team Deathmatch, Capture the Flag, Battle Royale. Low-poly graphics but solid shooting mechanics.',
    instructions_es: 'WASD mover · Ratón apuntar · Click disparar · R recargar · F vehículo · Tab marcador.',
    instructions_en: 'WASD move · Mouse aim · Click shoot · R reload · F vehicle · Tab scoreboard.',
    embed_url: 'https://warbrokers.io',
    thumb_url: '/thumbs/warbrokers-io.svg',
    min_players: 2, max_players: 16,
    category_slugs: ['multijugador'],
  },
  {
    slug: 'smash-karts',
    title_es: 'Smash Karts', title_en: 'Smash Karts',
    tagline_es: 'Karts multijugador online con power-ups y salas privadas.',
    tagline_en: 'Online multiplayer karts with power-ups and private rooms.',
    description_es: 'Smash Karts es un juego de karts multijugador online con sala privada. Conduce tu kart, recoge power-ups (misiles, bombas, escudos) y elimina a los rivales. Crea una sala privada para jugar con amigos. Partidas rápidas de 3-4 minutos, perfecto para cualquier pausa.',
    description_en: 'Smash Karts is an online multiplayer kart game with private rooms. Drive your kart, pick up power-ups (missiles, bombs, shields) and eliminate rivals. Create a private room to play with friends. Quick 3-4 minute matches, perfect for any break.',
    instructions_es: 'WASD o flechas para mover. Los power-ups se activan automáticamente. Crea sala privada desde el menú.',
    instructions_en: 'WASD or arrows to move. Power-ups activate automatically. Create private room from the menu.',
    embed_url: 'https://www.crazygames.com/embed/smash-karts',
    thumb_url: '/thumbs/smash-karts.svg',
    min_players: 2, max_players: 8,
    category_slugs: ['multijugador'],
  },
  {
    slug: 'ev-io',
    title_es: 'Ev.io', title_en: 'Ev.io',
    tagline_es: 'FPS sci-fi online con modos en equipo y sala privada.',
    tagline_en: 'Sci-fi online FPS with team modes and private rooms.',
    description_es: 'Ev.io es un shooter FPS en 3D con temática sci-fi. Crea una sala privada o únete a partidas rápidas. Modos equipo disponibles. Mecánicas de habilidades especiales (doble salto, dash) que lo diferencian de otros FPS del navegador. Gráficos sorprendentemente buenos para un juego de navegador.',
    description_en: 'Ev.io is a 3D sci-fi FPS. Create a private room or join quick matches. Team modes available. Special ability mechanics (double jump, dash) set it apart from other browser FPS. Surprisingly good graphics for a browser game.',
    instructions_es: 'WASD mover · Ratón apuntar · Click disparar · Espacio doble salto · Shift dash · R recargar.',
    instructions_en: 'WASD move · Mouse aim · Click shoot · Space double jump · Shift dash · R reload.',
    embed_url: 'https://www.crazygames.com/embed/ev-io',
    thumb_url: '/thumbs/ev-io.svg',
    min_players: 2, max_players: 12,
    category_slugs: ['multijugador'],
  },
  {
    slug: 'sploop-io',
    title_es: 'Sploop.io', title_en: 'Sploop.io',
    tagline_es: 'Supervivencia multijugador online: recoge, construye y combate.',
    tagline_en: 'Online multiplayer survival: gather, build and fight.',
    description_es: 'Sploop.io combina supervivencia, construcción y combate multijugador online. Recoge madera y piedra para construir muros y trampas, fabrica armas y herramientas, y lucha contra otros jugadores. Tiene modo equipo donde puedes jugar con amigos contra el resto del servidor.',
    description_en: 'Sploop.io combines survival, building and online multiplayer combat. Gather wood and stone to build walls and traps, craft weapons and tools, and fight other players. Has team mode where you can play with friends against the rest of the server.',
    instructions_es: 'WASD mover · Click izq atacar · Click der bloquear · Q/E rotar edificio · 1-5 seleccionar item.',
    instructions_en: 'WASD move · Left click attack · Right click block · Q/E rotate building · 1-5 select item.',
    embed_url: 'https://sploop.io',
    thumb_url: '/thumbs/sploop-io.svg',
    min_players: 2, max_players: 50,
    category_slugs: ['multijugador'],
  },
  {
    slug: 'narrow-one',
    title_es: 'Narrow One', title_en: 'Narrow One',
    tagline_es: 'Captura la bandera con arco y flecha. Equipos online 5v5.',
    tagline_en: 'Capture the flag with bow and arrow. Online 5v5 teams.',
    description_es: 'Narrow One es un juego de captura la bandera con arco y flecha para equipos de 5v5. Únete a tu equipo para asaltar el castillo rival y capturar su bandera, mientras defiendes la tuya. Física de flechas realista, mapas medievales, y partidas de 5 minutos perfectas para sesiones cortas. Uno de los mejores cooperativos en equipo del navegador.',
    description_en: 'Narrow One is a bow-and-arrow capture-the-flag game for 5v5 teams. Join your team to storm the rival castle and capture their flag, while defending yours. Realistic arrow physics, medieval maps, and 5-minute matches perfect for short sessions.',
    instructions_es: 'WASD mover · Ratón apuntar · Click mantener para cargar flecha · Soltar para disparar · Shift agacharse.',
    instructions_en: 'WASD move · Mouse aim · Click hold to charge arrow · Release to shoot · Shift crouch.',
    embed_url: 'https://www.crazygames.com/embed/narrow-one',
    thumb_url: '/thumbs/narrow-one.svg',
    min_players: 2, max_players: 10,
    category_slugs: ['cooperativos', 'multijugador'],
    featured: false,
  },
  {
    slug: 'venge-io',
    title_es: 'Venge.io', title_en: 'Venge.io',
    tagline_es: 'FPS competitivo online con modos en equipo y salas privadas.',
    tagline_en: 'Competitive online FPS with team modes and private rooms.',
    description_es: 'Venge.io es un FPS competitivo 3D con modos en equipo. Crea una sala privada para jugar con amigos en Team Deathmatch o Capture the Flag. Tiene un sistema de progresión con skins y niveles. Gráficos modernos y jugabilidad fluida.',
    description_en: 'Venge.io is a competitive 3D FPS with team modes. Create a private room to play with friends in Team Deathmatch or Capture the Flag. Has a progression system with skins and levels. Modern graphics and smooth gameplay.',
    instructions_es: 'WASD mover · Ratón apuntar · Click disparar · Shift correr · Espacio saltar · R recargar.',
    instructions_en: 'WASD move · Mouse aim · Click shoot · Shift run · Space jump · R reload.',
    embed_url: 'https://www.crazygames.com/embed/venge-io',
    thumb_url: '/thumbs/venge-io.svg',
    min_players: 2, max_players: 12,
    category_slugs: ['multijugador'],
  },
];

async function run() {
  for (const g of games) {
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
    console.log(`✓ ${g.slug}`);
  }
  console.log('\nTotal: 7 online coop/multiplayer games added');
}
run().catch(console.error);
