import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  numeric,
  index,
} from 'drizzle-orm/pg-core';

/**
 * Catalog schema. Two tables for the MVP — categories and games — with
 * locale-aware columns inline (`title_es`, `title_en`, etc.) instead of
 * a separate translations table. Trade-off:
 *   ✅ simpler queries (no joins per locale)
 *   ✅ cheap to render every page in every locale at build time
 *   ❌ adding a 3rd locale = a schema migration. Acceptable — we plan
 *     for ES + EN only for the foreseeable future.
 *
 * `categorySlugs` is a Postgres text[] instead of a join table to keep
 * the surface tiny. If we ever need many-to-many filtering with
 * efficiency we can add a `game_categories` join table; until then the
 * array + GIN index is plenty.
 */

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 64 }).notNull().unique(),
  nameEs: text('name_es').notNull(),
  nameEn: text('name_en').notNull(),
  descriptionEs: text('description_es').notNull(),
  descriptionEn: text('description_en').notNull(),
  icon: varchar('icon', { length: 16 }).notNull(),
  sort: integer('sort').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const games = pgTable(
  'games',
  {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 96 }).notNull().unique(),
    source: varchar('source', { length: 16 }).notNull().default('manual'),
    featured: boolean('featured').notNull().default(false),

    titleEs: text('title_es').notNull(),
    titleEn: text('title_en').notNull(),
    taglineEs: text('tagline_es').notNull(),
    taglineEn: text('tagline_en').notNull(),
    descriptionEs: text('description_es').notNull(),
    descriptionEn: text('description_en').notNull(),
    instructionsEs: text('instructions_es').notNull(),
    instructionsEn: text('instructions_en').notNull(),

    embedUrl: text('embed_url').notNull(),
    thumbUrl: text('thumb_url').notNull(),

    minPlayers: integer('min_players').notNull().default(1),
    maxPlayers: integer('max_players').notNull().default(1),

    categorySlugs: text('category_slugs').array().notNull().default([]),

    playsCount: integer('plays_count').notNull().default(0),
    ratingAvg: numeric('rating_avg', { precision: 3, scale: 2 })
      .notNull()
      .default('0'),

    publishedAt: timestamp('published_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => ({
    // Fast filter for "Featured" carousel.
    featuredIdx: index('games_featured_idx').on(t.featured),
    // Order-by for trending grids.
    playsCountIdx: index('games_plays_count_idx').on(t.playsCount),
  }),
);

export type Game = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
