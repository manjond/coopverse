import { config } from 'dotenv';
import { eq } from 'drizzle-orm';

config({ path: '.env.local' });
config({ path: '.env' });

import { db } from '../src/db/client';
import { games } from '../src/db/schema';

function sourceForGame(slug: string, embedUrl: string): string {
  if (slug === 'wobble-park' || slug === 'fighting-cats') return 'own';
  if (embedUrl === 'about:blank') return 'manual';

  let url: URL;
  try {
    url = new URL(embedUrl);
  } catch {
    return 'manual';
  }

  const host = url.hostname.replace(/^www\./, '');
  if (host === 'crazygames.com' && url.pathname.startsWith('/embed/')) return 'crazygames';
  if (host === 'html5.gamedistribution.com') return 'gamedistribution';
  if (host.endsWith('gamepix.com')) return 'gamepix';
  if (host.endsWith('gamezop.com')) return 'gamezop';
  if (host.endsWith('famobi.com')) return 'famobi';
  if (host.endsWith('itch.io')) return 'itch';
  return 'direct';
}

async function main() {
  const rows = await db
    .select({ slug: games.slug, source: games.source, embedUrl: games.embedUrl })
    .from(games);

  for (const row of rows) {
    const nextSource = sourceForGame(row.slug, row.embedUrl);
    if (nextSource === row.source) continue;

    await db
      .update(games)
      .set({ source: nextSource, updatedAt: new Date() })
      .where(eq(games.slug, row.slug));
    console.log(`${row.slug}: ${row.source} -> ${nextSource}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
