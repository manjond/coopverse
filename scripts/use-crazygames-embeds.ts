import { config } from 'dotenv';
import { eq } from 'drizzle-orm';

config({ path: '.env.local' });
config({ path: '.env' });

import { db } from '../src/db/client';
import { games } from '../src/db/schema';

const CRAZYGAMES_EMBEDS: Record<string, { embedUrl: string; thumbUrl?: string }> = {
  'battledudes-io': { embedUrl: 'https://www.crazygames.com/embed/battledudes-io' },
  'bonk-io': { embedUrl: 'https://www.crazygames.com/embed/bonkio' },
  'brutes-io': { embedUrl: 'https://www.crazygames.com/embed/brutesio' },
  'defly-io': { embedUrl: 'https://www.crazygames.com/embed/deflyio' },
  'diep-io': { embedUrl: 'https://www.crazygames.com/embed/diepio' },
  'krunker-io': { embedUrl: 'https://www.crazygames.com/embed/krunker-io' },
  'moomoo-io': { embedUrl: 'https://www.crazygames.com/embed/moomooio' },
  'nightpoint-io': { embedUrl: 'https://www.crazygames.com/embed/nightpointio' },
  'paper-io-2': { embedUrl: 'https://www.crazygames.com/embed/paper-io-2' },
  'powerline-io': { embedUrl: 'https://www.crazygames.com/embed/powerlineio' },
  'shell-shockers': {
    embedUrl: 'https://www.crazygames.com/embed/shellshockersio',
    thumbUrl: '/thumbs/shell-shockers.svg',
  },
  'splix-io': { embedUrl: 'https://www.crazygames.com/embed/splixio' },
  'sploop-io': { embedUrl: 'https://www.crazygames.com/embed/sploop-io' },
  'stabfish2-io': { embedUrl: 'https://www.crazygames.com/embed/stabfish2-io-multiplayer' },
  'superhex-io': { embedUrl: 'https://www.crazygames.com/embed/superhexio' },
  'surviv-io': {
    embedUrl: 'https://www.crazygames.com/embed/survivio',
    thumbUrl: '/thumbs/surviv-io.svg',
  },
  'warbrokers-io': { embedUrl: 'https://www.crazygames.com/embed/war-brokers-io' },
  'wings-io': { embedUrl: 'https://www.crazygames.com/embed/wingsio' },
  'wormate-io': {
    embedUrl: 'https://www.crazygames.com/embed/wormateio',
    thumbUrl: '/thumbs/wormate-io.svg',
  },
};

async function main() {
  for (const [slug, update] of Object.entries(CRAZYGAMES_EMBEDS)) {
    await db
      .update(games)
      .set({
        source: 'crazygames',
        embedUrl: update.embedUrl,
        ...(update.thumbUrl ? { thumbUrl: update.thumbUrl } : {}),
        updatedAt: new Date(),
      })
      .where(eq(games.slug, slug));

    console.log(`${slug} -> ${update.embedUrl}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
