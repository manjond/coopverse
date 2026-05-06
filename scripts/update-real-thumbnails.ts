import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

// Real thumbnails from og:image tags scraped from each game's website
const thumbs: Record<string, string> = {
  // CrazyGames CDN — real og:image URLs
  'getaway-shootout':   'https://imgs.crazygames.com/getaway-shootout_16x9/20241230044730/getaway-shootout_16x9-cover?metadata=none&quality=100&width=800&height=450&fit=crop',
  'rooftop-snipers':    'https://imgs.crazygames.com/rooftop-snipers_16x9/20250108040440/rooftop-snipers_16x9-cover?metadata=none&quality=100&width=800&height=450&fit=crop',
  'house-of-hazards':   'https://imgs.crazygames.com/house-of-hazards_16x9/20250108101728/house-of-hazards_16x9-cover?metadata=none&quality=100&width=800&height=450&fit=crop',
  'ragdoll-archers':    'https://imgs.crazygames.com/ragdoll-archers_16x9/20250926080758/ragdoll-archers_16x9-cover?metadata=none&quality=100&width=800&height=450&fit=crop',
  'smash-karts':        'https://imgs.crazygames.com/smash-karts_16x9/20260210123937/smash-karts_16x9-cover?metadata=none&quality=100&width=800&height=450&fit=crop',
  'bowman':             'https://imgs.crazygames.com/bowman.png?metadata=none&quality=100&width=800&height=450&fit=crop',
  'rocket-bot-royale':  'https://imgs.crazygames.com/games/rocket-bot-royale/cover_16x9-1732723484943.png?metadata=none&quality=100&width=800&height=450&fit=crop',
  '8-ball-billiards':   'https://imgs.crazygames.com/8-ball-billiards-classic_16x9/20231108025958/8-ball-billiards-classic_16x9-cover?metadata=none&quality=100&width=800&height=450&fit=crop',

  // Direct game site og:images
  'ev-io':              'https://ev.io/themes/ev/images/ev-io-og-image.png',
  'sketchful-io':       'https://sketchful.io/res/logo/thumbnail.png',
  'shell-shockers':     'https://www.shellshock.io/img/previewImage_shellShockers.webp',
  'wormate-io':         'https://wormate.io/images/og-share-img-3.png',
  'surviv-io':          'https://surviv.io/img/title.png',
};

async function run() {
  for (const [slug, url] of Object.entries(thumbs)) {
    await sql`UPDATE games SET thumb_url = ${url} WHERE slug = ${slug}`;
    console.log(`✓ ${slug}`);
  }
  console.log(`\n✅ Updated ${Object.keys(thumbs).length} real thumbnails`);
}
run().catch(console.error);
