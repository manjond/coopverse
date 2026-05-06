import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

async function run() {
  // Add new categories
  const newCats = [
    { slug: 'accion',       name_es: 'Acción',        name_en: 'Action',       desc_es: 'Juegos de acción frenética y reflejos rápidos.', desc_en: 'Fast-paced action games with quick reflexes.', icon: '⚔️', sort: 3 },
    { slug: 'fisica',       name_es: 'Física',         name_en: 'Physics',      desc_es: 'Juegos basados en física real. Empuja, lanza y choca.', desc_en: 'Physics-based games. Push, throw and collide.', icon: '🎱', sort: 4 },
    { slug: 'party',        name_es: 'Party',          name_en: 'Party',        desc_es: 'Perfectos para jugar en grupo. Diversión garantizada.', desc_en: 'Perfect for playing in groups. Fun guaranteed.', icon: '🎉', sort: 5 },
    { slug: 'estrategia',   name_es: 'Estrategia',     name_en: 'Strategy',     desc_es: 'Piensa antes de actuar. Conquista, construye y domina.', desc_en: 'Think before you act. Conquer, build and dominate.', icon: '♟️', sort: 6 },
    { slug: 'disparos',     name_es: 'Disparos',       name_en: 'Shooters',     desc_es: 'FPS y juegos de disparos multijugador en el navegador.', desc_en: 'FPS and multiplayer shooting games in the browser.', icon: '🔫', sort: 7 },
    { slug: 'carreras',     name_es: 'Carreras',       name_en: 'Racing',       desc_es: 'Velocidad, drift y adelantamientos. Gana la carrera.', desc_en: 'Speed, drift and overtaking. Win the race.', icon: '🏎️', sort: 8 },
    { slug: 'supervivencia',name_es: 'Supervivencia',  name_en: 'Survival',     desc_es: 'Sobrevive el máximo tiempo posible contra todos.', desc_en: 'Survive as long as possible against everyone.', icon: '🏕️', sort: 9 },
    { slug: 'dibujo',       name_es: 'Dibujo',         name_en: 'Drawing',      desc_es: 'Dibuja, adivina y demuestra tu creatividad.', desc_en: 'Draw, guess and show your creativity.', icon: '🎨', sort: 10 },
    { slug: 'deportes',     name_es: 'Deportes',       name_en: 'Sports',       desc_es: 'Juegos deportivos online para competir con amigos.', desc_en: 'Online sports games to compete with friends.', icon: '⚽', sort: 11 },
  ];

  for (const c of newCats) {
    await sql`
      INSERT INTO categories (slug, name_es, name_en, description_es, description_en, icon, sort)
      VALUES (${c.slug}, ${c.name_es}, ${c.name_en}, ${c.desc_es}, ${c.desc_en}, ${c.icon}, ${c.sort})
      ON CONFLICT (slug) DO NOTHING
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
