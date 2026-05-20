import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function run() {
  const slug = 'fighting-cats';
  const categorySlugs = ['multijugador', 'accion', 'dos-jugadores', 'cuatro-jugadores', 'party'];

  await sql`
    INSERT INTO games (
      slug, source, featured,
      title_es, title_en, tagline_es, tagline_en,
      description_es, description_en,
      instructions_es, instructions_en,
      embed_url, thumb_url,
      min_players, max_players, category_slugs,
      published_at, updated_at
    )
    VALUES (
      ${slug}, 'own', true,
      'Fighting Cats', 'Fighting Cats',
      'Arena de lucha gatuna para hasta 8 jugadores.',
      'Cat platform fighting for up to 8 players.',
      'Fighting Cats es un juego de lucha en plataformas con gatos, armas locas, arenas dinamicas y salas online. Crea una partida, comparte el codigo con tus amigos y entra en rondas rapidas llenas de golpes, saltos y caos controlado.',
      'Fighting Cats is a platform fighting game with cats, wild weapons, dynamic arenas and online rooms. Create a match, share the room code with friends, and jump into quick rounds full of hits, jumps and controlled chaos.',
      'Crea una sala o unete con codigo. Muevete, salta, recoge armas y empuja a tus rivales fuera de la arena. En movil aparecen controles tactiles automaticamente.',
      'Create a room or join with a code. Move, jump, grab weapons and knock rivals out of the arena. Touch controls appear automatically on mobile.',
      'https://fighting-cats.vercel.app',
      '/thumbs/fighting-cats.jpg',
      1, 8, ${categorySlugs},
      NOW(), NOW()
    )
    ON CONFLICT (slug) DO UPDATE SET
      source = EXCLUDED.source,
      featured = EXCLUDED.featured,
      title_es = EXCLUDED.title_es,
      title_en = EXCLUDED.title_en,
      tagline_es = EXCLUDED.tagline_es,
      tagline_en = EXCLUDED.tagline_en,
      description_es = EXCLUDED.description_es,
      description_en = EXCLUDED.description_en,
      instructions_es = EXCLUDED.instructions_es,
      instructions_en = EXCLUDED.instructions_en,
      embed_url = EXCLUDED.embed_url,
      thumb_url = EXCLUDED.thumb_url,
      min_players = EXCLUDED.min_players,
      max_players = EXCLUDED.max_players,
      category_slugs = EXCLUDED.category_slugs,
      updated_at = NOW()
  `;

  await sql`
    UPDATE games
    SET featured = true, updated_at = NOW()
    WHERE slug = 'wobble-park'
  `;

  console.log('Fighting Cats is in the catalog and featured with Wobble Park');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
