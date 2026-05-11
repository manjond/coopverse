import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

async function run() {
  // Add new categories
  const newCats = [
    { slug: 'accion',       name_es: 'Acción',        name_en: 'Action',       desc_es: 'Juegos rápidos de moverse, esquivar y reaccionar a tiempo.', desc_en: 'Fast games about moving, dodging, and reacting in time.', icon: '⚔️', sort: 3 },
    { slug: 'fisica',       name_es: 'Física',         name_en: 'Physics',      desc_es: 'Juegos donde los empujones, saltos y choques cambian la partida.', desc_en: 'Games where pushes, jumps, and collisions change the match.', icon: '🎱', sort: 4 },
    { slug: 'party',        name_es: 'Party',          name_en: 'Party',        desc_es: 'Juegos fáciles de abrir en grupo cuando solo queréis reíros un rato.', desc_en: 'Easy group games for when everyone just wants to laugh for a while.', icon: '🎉', sort: 5 },
    { slug: 'estrategia',   name_es: 'Estrategia',     name_en: 'Strategy',     desc_es: 'Juegos para pensar el siguiente movimiento antes de lanzarte.', desc_en: 'Games where you think about the next move before jumping in.', icon: '♟️', sort: 6 },
    { slug: 'disparos',     name_es: 'Disparos',       name_en: 'Shooters',     desc_es: 'Juegos de apuntar, cubrirse y coordinarse con el equipo.', desc_en: 'Games about aiming, taking cover, and working with your team.', icon: '🔫', sort: 7 },
    { slug: 'carreras',     name_es: 'Carreras',       name_en: 'Racing',       desc_es: 'Juegos de velocidad para adelantar, derrapar y llegar primero.', desc_en: 'Speed games where you overtake, drift, and try to finish first.', icon: '🏎️', sort: 8 },
    { slug: 'supervivencia',name_es: 'Supervivencia',  name_en: 'Survival',     desc_es: 'Juegos donde aguantas todo lo posible mientras el mapa se complica.', desc_en: 'Games where you last as long as possible while the map gets harder.', icon: '🏕️', sort: 9 },
    { slug: 'dibujo',       name_es: 'Dibujo',         name_en: 'Drawing',      desc_es: 'Juegos de dibujar y adivinar, incluso si dibujas fatal.', desc_en: 'Draw-and-guess games, even if your drawings are terrible.', icon: '🎨', sort: 10 },
    { slug: 'deportes',     name_es: 'Deportes',       name_en: 'Sports',       desc_es: 'Fútbol, billar, penaltis y otros duelos deportivos rápidos.', desc_en: 'Football, pool, penalties, and other quick sports duels.', icon: '⚽', sort: 11 },
  ];

  for (const c of newCats) {
    await sql`
      INSERT INTO categories (slug, name_es, name_en, description_es, description_en, icon, sort)
      VALUES (${c.slug}, ${c.name_es}, ${c.name_en}, ${c.desc_es}, ${c.desc_en}, ${c.icon}, ${c.sort})
      ON CONFLICT (slug) DO UPDATE SET
        name_es = EXCLUDED.name_es,
        name_en = EXCLUDED.name_en,
        description_es = EXCLUDED.description_es,
        description_en = EXCLUDED.description_en,
        icon = EXCLUDED.icon,
        sort = EXCLUDED.sort
    `;
    console.log(`✓ category: ${c.slug}`);
  }

  // Update all game categories
  const assignments: [string, string[]][] = [
    ['wobble-park',        ['cooperativos', 'plataformas', 'multijugador', 'cuatro-jugadores']],
    ['krunker-io',         ['multijugador', 'accion', 'disparos']],
    ['diep-io',            ['multijugador', 'estrategia', 'accion']],
    ['splix-io',           ['multijugador', 'estrategia']],
    ['paper-io-2',         ['multijugador', 'estrategia']],
    ['shell-shockers',     ['multijugador', 'accion', 'disparos']],
    ['wormate-io',         ['multijugador', 'supervivencia']],
    ['surviv-io',          ['multijugador', 'supervivencia']],
    ['getaway-shootout',   ['dos-jugadores', 'multijugador', 'fisica', 'party']],
    ['rooftop-snipers',    ['dos-jugadores', 'multijugador', 'fisica']],
    ['house-of-hazards',   ['cooperativos', 'dos-jugadores', 'multijugador', 'party', 'cuatro-jugadores']],
    ['ragdoll-archers',    ['dos-jugadores', 'multijugador', 'fisica']],
    ['tag-2-3-4-players',  ['cooperativos', 'dos-jugadores', 'multijugador', 'party', 'cuatro-jugadores']],
    ['8-ball-billiards',   ['dos-jugadores', 'deportes', 'multijugador']],
    ['zombs-io',           ['cooperativos', 'multijugador', 'estrategia']],
    ['warbrokers-io',      ['multijugador', 'accion', 'disparos']],
    ['smash-karts',        ['multijugador', 'carreras', 'party']],
    ['ev-io',              ['multijugador', 'accion', 'disparos']],
    ['sploop-io',          ['multijugador', 'supervivencia', 'estrategia']],
    ['narrow-one',         ['cooperativos', 'multijugador', 'accion']],
    ['venge-io',           ['multijugador', 'accion', 'disparos']],
    ['bonk-io',            ['cooperativos', 'multijugador', 'fisica', 'dos-jugadores', 'party']],
    ['drunken-wrestlers-2',['dos-jugadores', 'fisica', 'party']],
    ['wrestle-jump',       ['dos-jugadores', 'fisica', 'party']],
    ['rocket-bot-royale',  ['multijugador', 'fisica', 'accion']],
    ['curve-fever-pro',    ['multijugador', 'estrategia']],
    ['wings-io',           ['multijugador', 'accion', 'supervivencia']],
    ['sketchful-io',       ['multijugador', 'party', 'dibujo']],
    ['powerline-io',       ['multijugador', 'supervivencia']],
    ['territorial-io',     ['multijugador', 'estrategia']],
    ['bowman',             ['dos-jugadores', 'fisica', 'deportes']],
    ['ludo-online',        ['dos-jugadores', 'multijugador', 'party', 'cuatro-jugadores']],
  ];

  for (const [slug, cats] of assignments) {
    await sql`UPDATE games SET category_slugs = ${cats} WHERE slug = ${slug}`;
    console.log(`✓ ${slug} → ${cats.join(', ')}`);
  }

  console.log('\n✅ Done — categories and assignments updated');
}
run().catch(console.error);
