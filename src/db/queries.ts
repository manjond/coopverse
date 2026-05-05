import { eq, desc, sql, asc, inArray } from 'drizzle-orm';
import { db } from './client';
import { categories, favorites, games, type Game, type Category } from './schema';
import type { Locale } from '@/data/types';

/**
 * Catalog read API. Pages call these instead of touching the DB
 * directly — keeps query logic in one file and lets us swap caches /
 * memoization in later without touching every page.
 *
 * All queries are static-friendly (no per-user data, no cookies) so the
 * Next.js build can pre-render them at deploy time.
 */

// ─── Category reads ──────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  return db.select().from(categories).orderBy(asc(categories.sort), asc(categories.id));
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const rows = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return rows[0];
}

// ─── Game reads ──────────────────────────────────────────────────────────────

export async function getAllGames(): Promise<Game[]> {
  return db.select().from(games).orderBy(desc(games.featured), desc(games.publishedAt));
}

export async function getGameBySlug(slug: string): Promise<Game | undefined> {
  const rows = await db.select().from(games).where(eq(games.slug, slug)).limit(1);
  return rows[0];
}

export async function getFeaturedGames(): Promise<Game[]> {
  return db.select().from(games).where(eq(games.featured, true)).orderBy(desc(games.publishedAt));
}

export async function getPopularGames(limit = 12): Promise<Game[]> {
  // Until play_logs exists we surface featured-first then by recency.
  return db
    .select()
    .from(games)
    .orderBy(desc(games.featured), desc(games.playsCount), desc(games.publishedAt))
    .limit(limit);
}

export async function getGamesByCategory(categorySlug: string): Promise<Game[]> {
  // Postgres array containment — no join needed thanks to text[] column.
  return db
    .select()
    .from(games)
    .where(sql`${games.categorySlugs} @> ARRAY[${categorySlug}]::text[]`)
    .orderBy(desc(games.featured), desc(games.publishedAt));
}

/** Filter by category + max player count (for programmatic SEO combo pages). */
export async function getGamesByCategoryAndPlayers(
  categorySlug: string,
  maxPlayers: number,
): Promise<Game[]> {
  return db
    .select()
    .from(games)
    .where(
      sql`${games.categorySlugs} @> ARRAY[${categorySlug}]::text[]
          AND ${games.maxPlayers} <= ${maxPlayers}`,
    )
    .orderBy(desc(games.featured), desc(games.publishedAt));
}

export async function getRelatedGames(currentSlug: string, categorySlug: string, limit = 4) {
  return db
    .select()
    .from(games)
    .where(
      sql`${games.categorySlugs} @> ARRAY[${categorySlug}]::text[]
          AND ${games.slug} <> ${currentSlug}`,
    )
    .limit(limit);
}

// ─── Favorites ───────────────────────────────────────────────────────────────

export async function getUserFavoriteSlugs(userId: string): Promise<string[]> {
  const rows = await db
    .select({ gameSlug: favorites.gameSlug })
    .from(favorites)
    .where(eq(favorites.userId, userId));
  return rows.map((r) => r.gameSlug);
}

export async function getUserFavoriteGames(userId: string): Promise<Game[]> {
  const slugs = await getUserFavoriteSlugs(userId);
  if (slugs.length === 0) return [];
  return db.select().from(games).where(inArray(games.slug, slugs));
}

// ─── Locale projection helpers ───────────────────────────────────────────────
//
// Pages were originally written against the seed-data shape with
// LocalizedString fields (`{ es, en }`). We keep that ergonomic at the
// page layer by projecting DB rows through these helpers, so existing
// templates render unchanged.

export function projectGame(g: Game) {
  return {
    slug: g.slug,
    source: g.source as 'own' | 'gd' | 'manual',
    featured: g.featured,
    title: { es: g.titleEs, en: g.titleEn },
    tagline: { es: g.taglineEs, en: g.taglineEn },
    description: { es: g.descriptionEs, en: g.descriptionEn },
    instructions: { es: g.instructionsEs, en: g.instructionsEn },
    embedUrl: g.embedUrl,
    thumbUrl: g.thumbUrl,
    minPlayers: g.minPlayers,
    maxPlayers: g.maxPlayers,
    categories: g.categorySlugs,
    publishedAt: g.publishedAt.toISOString().slice(0, 10),
  };
}

export function projectCategory(c: Category) {
  return {
    slug: c.slug,
    name: { es: c.nameEs, en: c.nameEn },
    description: { es: c.descriptionEs, en: c.descriptionEn },
    icon: c.icon,
  };
}

// Convenience: lookup the localized field directly when only one is needed.
export function localized<T extends { es: string; en: string }>(field: T, locale: Locale) {
  return field[locale];
}
