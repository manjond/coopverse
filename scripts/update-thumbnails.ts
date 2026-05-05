import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

// Real thumbnail URLs sourced from each game's official assets / CDNs
const thumbs: Record<string, string> = {
  'krunker-io':       'https://imgs.crazygames.com/krunker-io_16x9/1695303544117/krunker-io_16x9-cover.jpg',
  'diep-io':          'https://imgs.crazygames.com/diepio/1687785427036/diepio-cover.jpg',
  'splix-io':         'https://imgs.crazygames.com/splix-io/1657704155875/splix-io-cover.jpg',
  'paper-io-2':       'https://imgs.crazygames.com/paper-io-2/1672920244087/paper-io-2-cover.jpg',
  'shell-shockers':   'https://imgs.crazygames.com/shell-shockers/1700582413259/shell-shockers-cover.jpg',
  'wormate-io':       'https://imgs.crazygames.com/wormate-io/1687785556898/wormate-io-cover.jpg',
  'surviv-io':        'https://imgs.crazygames.com/survivio/1687785515600/survivio-cover.jpg',
  'getaway-shootout': 'https://imgs.crazygames.com/getaway-shootout/1687785294673/getaway-shootout-cover.jpg',
  'rooftop-snipers':  'https://imgs.crazygames.com/rooftop-snipers/1687785472625/rooftop-snipers-cover.jpg',
};

async function run() {
  for (const [slug, url] of Object.entries(thumbs)) {
    await sql`UPDATE games SET thumb_url = ${url} WHERE slug = ${slug}`;
    console.log(`✓ ${slug}`);
  }
  console.log('Done — thumbnails updated');
}
run().catch(console.error);
