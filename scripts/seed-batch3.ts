import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

const CG = (path: string) =>
  `https://imgs.crazygames.com/${path}?metadata=none&quality=100&width=800&height=450&fit=crop`;

const games = [
  {
    slug: 'mini-royale-nations',
    title_es: 'Mini Royale: Nations', title_en: 'Mini Royale: Nations',
    tagline_es: 'Battle royale FPS multijugador online con modos en equipo.',
    tagline_en: 'Online multiplayer FPS battle royale with team modes.',
    description_es: 'Mini Royale: Nations es un FPS multijugador battle royale directamente en el navegador. Juega en equipos, construye bases, conquista zonas y elimina al equipo rival. Gráficos 3D sorprendentemente buenos para un juego de navegador. Crea salas privadas para jugar con amigos.',
    description_en: 'Mini Royale: Nations is a browser FPS battle royale. Play in teams, build bases, conquer zones and eliminate the rival team. Surprisingly good 3D graphics for a browser game.',
    instructions_es: 'WASD mover · Ratón apuntar · Click disparar · E interactuar · B construir.',
    instructions_en: 'WASD move · Mouse aim · Click shoot · E interact · B build.',
    embed_url: 'https://www.crazygames.com/embed/mini-royale-nations',
    thumb_url: '/thumbs/mini-royale-nations.svg',
    min_players: 2, max_players: 32,
    category_slugs: ['multijugador', 'accion', 'disparos'],
  },
  {
    slug: 'moomoo-io',
    title_es: 'MooMoo.io', title_en: 'MooMoo.io',
    tagline_es: 'Supervivencia y construcción multijugador: recolecta, construye, domina.',
    tagline_en: 'Multiplayer survival and building: gather, build, dominate.',
    description_es: 'MooMoo.io combina supervivencia, recolección de recursos y construcción en un mundo multijugador. Recoge madera y piedra, construye muros y molinos de viento, fabrica armas y únete a tribus con otros jugadores para dominar el mapa. Partidas estratégicas de 15-30 minutos.',
    description_en: 'MooMoo.io combines survival, resource gathering and building in a multiplayer world. Gather wood and stone, build walls and windmills, craft weapons and join tribes to dominate the map.',
    instructions_es: 'WASD mover · Click atacar · Q/E/R seleccionar ítem · Enter unirse a tribu.',
    instructions_en: 'WASD move · Click attack · Q/E/R select item · Enter join tribe.',
    embed_url: 'https://moomoo.io',
    thumb_url: '/thumbs/moomoo-io.svg',
    min_players: 2, max_players: 50,
    category_slugs: ['multijugador', 'estrategia', 'supervivencia'],
  },
  {
    slug: 'nightpoint-io',
    title_es: 'Nightpoint.io', title_en: 'Nightpoint.io',
    tagline_es: 'Shooter cooperativo online: sobrevive la noche junto a otros jugadores.',
    tagline_en: 'Online cooperative shooter: survive the night with other players.',
    description_es: 'Nightpoint.io es un shooter cooperativo de supervivencia. Cada noche llegan oleadas de zombis más fuertes. Colabora con otros jugadores online para sobrevivir, recoge armas y mejora tus habilidades. Uno de los pocos juegos .io genuinamente cooperativos del navegador.',
    description_en: 'Nightpoint.io is a cooperative survival shooter. Each night brings stronger zombie waves. Collaborate with online players to survive, collect weapons and upgrade skills. One of the few genuinely co-op .io browser games.',
    instructions_es: 'WASD mover · Ratón apuntar · Click disparar · R recargar · 1-4 cambiar arma.',
    instructions_en: 'WASD move · Mouse aim · Click shoot · R reload · 1-4 switch weapon.',
    embed_url: 'https://nightpoint.io',
    thumb_url: '/thumbs/nightpoint-io.svg',
    min_players: 1, max_players: 20,
    category_slugs: ['cooperativos', 'multijugador', 'accion', 'supervivencia'],
  },
  {
    slug: 'battledudes-io',
    title_es: 'Battle Dudes', title_en: 'Battle Dudes',
    tagline_es: 'Shooter multijugador online retro y divertido con salas.',
    tagline_en: 'Retro fun online multiplayer shooter with rooms.',
    description_es: 'Battle Dudes es un shooter multijugador 2D con estética retro y pixel art. Crea o únete a salas de juego, elige tu equipo y elimina a los rivales en mapas variados. Incluye modos Deathmatch, Team Deathmatch y captura la bandera. Muy entretenido y ligero.',
    description_en: 'Battle Dudes is a 2D multiplayer shooter with retro pixel art aesthetics. Create or join game rooms, pick your team and eliminate rivals in varied maps. Includes Deathmatch, Team Deathmatch and capture the flag modes.',
    instructions_es: 'WASD mover · Ratón apuntar · Click disparar · E recoger arma · Espacio saltar.',
    instructions_en: 'WASD move · Mouse aim · Click shoot · E pick up weapon · Space jump.',
    embed_url: 'https://battledudes.io',
    thumb_url: '/thumbs/battledudes-io.svg',
    min_players: 2, max_players: 16,
    category_slugs: ['multijugador', 'accion', 'disparos'],
  },
  {
    slug: 'stickman-army-team-battle',
    title_es: 'Stickman Army: Team Battle', title_en: 'Stickman Army: Team Battle',
    tagline_es: 'Batalla de equipos de stickmen para 2 jugadores en el mismo teclado.',
    tagline_en: '2-player same-keyboard stickman team battle.',
    description_es: 'Stickman Army: Team Battle es un juego de estrategia táctica para 2 jugadores en el mismo teclado. Cada jugador controla un ejército de stickmen con diferentes unidades (soldados, tanques, aviones). Despliega tropas, gestiona recursos y destruye la base del rival.',
    description_en: 'Stickman Army: Team Battle is a tactical strategy game for 2 players on the same keyboard. Each player controls a stickman army with different units. Deploy troops, manage resources and destroy the rival base.',
    instructions_es: 'Jugador 1: teclas izquierda del teclado. Jugador 2: teclas derecha. Se explica en el juego.',
    instructions_en: 'Player 1: left side keyboard keys. Player 2: right side keys. Explained in-game.',
    embed_url: 'https://www.crazygames.com/embed/stickman-army-team-battle',
    thumb_url: CG('games/stickman-army-team-battle/cover-1597935030371.png'),
    min_players: 2, max_players: 2,
    category_slugs: ['dos-jugadores', 'multijugador', 'estrategia'],
  },
  {
    slug: 'paper-minecraft',
    title_es: 'Paper Minecraft', title_en: 'Paper Minecraft',
    tagline_es: 'Minecraft en 2D directamente en tu navegador. Construye y explora.',
    tagline_en: '2D Minecraft directly in your browser. Build and explore.',
    description_es: 'Paper Minecraft es la versión 2D del famoso juego de construcción. Elige entre modo supervivencia o creativo, construye estructuras, explora cuevas y crafting básico. Ideal para jugar desde cualquier dispositivo sin instalaciones. Una joya de los juegos de navegador.',
    description_en: 'Paper Minecraft is the 2D version of the famous building game. Choose survival or creative mode, build structures, explore caves and basic crafting. Perfect for any device without installations.',
    instructions_es: 'WASD mover · Click izq destruir bloque · Click der colocar bloque · E inventario.',
    instructions_en: 'WASD move · Left click break block · Right click place block · E inventory.',
    embed_url: 'https://www.crazygames.com/embed/paper-minecraft',
    thumb_url: CG('games/paper-minecraft/cover-1655211126030.png'),
    min_players: 1, max_players: 1,
    category_slugs: ['accion', 'estrategia'],
  },
  {
    slug: 'crazy-roll-3d',
    title_es: 'Crazy Roll 3D', title_en: 'Crazy Roll 3D',
    tagline_es: 'Bola rodante 3D: esquiva obstáculos y llega lo más lejos posible.',
    tagline_en: '3D rolling ball: dodge obstacles and go as far as possible.',
    description_es: 'Crazy Roll 3D es un juego arcade de habilidad donde controlas una bola rodante por una pista infinita llena de obstáculos. Esquiva bloques, recoge powerups y compite por el máximo score. Gráficos 3D fluidos y partidas rápidas de 2-3 minutos.',
    description_en: 'Crazy Roll 3D is a skill arcade game where you control a rolling ball on an infinite track full of obstacles. Dodge blocks, collect powerups and compete for high score.',
    instructions_es: 'Flechas izq/der o A/D para esquivar. Espacio o flecha arriba para saltar.',
    instructions_en: 'Left/right arrows or A/D to dodge. Space or up arrow to jump.',
    embed_url: 'https://www.crazygames.com/embed/crazy-roll-3d',
    thumb_url: CG('games/crazy-roll-3d/cover_16x9-1709124312204.png'),
    min_players: 1, max_players: 1,
    category_slugs: ['accion'],
  },
  {
    slug: 'drift-hunters',
    title_es: 'Drift Hunters', title_en: 'Drift Hunters',
    tagline_es: 'Simulador de drift 3D con coches tuneables. El mejor de navegador.',
    tagline_en: '3D drift simulator with tunable cars. Best browser drifting game.',
    description_es: 'Drift Hunters es el mejor juego de drift del navegador. Física de coche realista, 26 coches desbloqueables, tuning completo (llantas, suspensión, turbo), 10 circuitos. Gana puntos con tus drifts para desbloquear mejoras. Gráficos 3D impresionantes para un juego de navegador.',
    description_en: 'Drift Hunters is the best browser drifting game. Realistic car physics, 26 unlockable cars, full tuning (wheels, suspension, turbo), 10 tracks. Earn points with your drifts to unlock upgrades.',
    instructions_es: 'WASD o flechas para conducir. Espacio freno de mano. C cambiar cámara.',
    instructions_en: 'WASD or arrows to drive. Space handbrake. C change camera.',
    embed_url: 'https://www.crazygames.com/embed/drift-hunters',
    thumb_url: CG('games/drift-hunters/cover-1656950639575.png'),
    min_players: 1, max_players: 1,
    category_slugs: ['carreras', 'accion'],
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
}
run().catch(console.error);
