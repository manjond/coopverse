/**
 * One-shot seed: writes the initial catalog (PikoPark + categories) to
 * the Neon database. Idempotent — uses ON CONFLICT DO UPDATE so re-runs
 * sync any changes you made to the seed source files.
 *
 * Run with:  npm run db:seed
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });

import { db } from '../src/db/client';
import { categories, games } from '../src/db/schema';
import { CATEGORIES } from '../src/data/categories';
import { GAMES } from '../src/data/games';

async function main() {
  console.log('🌱 Seeding categories…');
  for (const [i, c] of CATEGORIES.entries()) {
    await db
      .insert(categories)
      .values({
        slug: c.slug,
        nameEs: c.name.es,
        nameEn: c.name.en,
        descriptionEs: c.description.es,
        descriptionEn: c.description.en,
        icon: c.icon,
        sort: i,
      })
      .onConflictDoUpdate({
        target: categories.slug,
        set: {
          nameEs: c.name.es,
          nameEn: c.name.en,
          descriptionEs: c.description.es,
          descriptionEn: c.description.en,
          icon: c.icon,
          sort: i,
        },
      });
    console.log(`  ✓ ${c.slug}`);
  }

  console.log('🎮 Seeding games…');
  for (const g of GAMES) {
    await db
      .insert(games)
      .values({
        slug: g.slug,
        source: g.source,
        featured: g.featured,
        titleEs: g.title.es,
        titleEn: g.title.en,
        taglineEs: g.tagline.es,
        taglineEn: g.tagline.en,
        descriptionEs: g.description.es,
        descriptionEn: g.description.en,
        instructionsEs: g.instructions.es,
        instructionsEn: g.instructions.en,
        embedUrl: g.embedUrl,
        thumbUrl: g.thumbUrl,
        minPlayers: g.minPlayers,
        maxPlayers: g.maxPlayers,
        categorySlugs: g.categories,
        publishedAt: new Date(g.publishedAt),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: games.slug,
        set: {
          source: g.source,
          featured: g.featured,
          titleEs: g.title.es,
          titleEn: g.title.en,
          taglineEs: g.tagline.es,
          taglineEn: g.tagline.en,
          descriptionEs: g.description.es,
          descriptionEn: g.description.en,
          instructionsEs: g.instructions.es,
          instructionsEn: g.instructions.en,
          embedUrl: g.embedUrl,
          thumbUrl: g.thumbUrl,
          minPlayers: g.minPlayers,
          maxPlayers: g.maxPlayers,
          categorySlugs: g.categories,
          updatedAt: new Date(),
        },
      });
    console.log(`  ✓ ${g.slug}`);
  }

  // Sanity check — count rows by reading and len-checking. Cheap with
  // dozens of rows; if the catalog ever balloons swap to SELECT count(*).
  const allCats = await db.select().from(categories);
  const allGames = await db.select().from(games);
  console.log(`✅ Done. ${allCats.length} categories, ${allGames.length} games in DB.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
