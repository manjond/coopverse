import { config } from 'dotenv';
import { eq } from 'drizzle-orm';

config({ path: '.env.local' });
config({ path: '.env' });

import { db } from '../src/db/client';
import { games } from '../src/db/schema';

const PLACEHOLDER_SLUGS = ['placeholder-skribbl'];

async function main() {
  for (const slug of PLACEHOLDER_SLUGS) {
    await db.delete(games).where(eq(games.slug, slug));
    console.log(`Removed placeholder game: ${slug}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
