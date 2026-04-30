/**
 * Catalog types — kept in src/data so pages can import them today
 * (hard-coded seed) and tomorrow when we swap to Neon (Step 11) the
 * shape stays the same.
 */

export type Locale = 'es' | 'en';

export interface LocalizedString {
  es: string;
  en: string;
}

export type GameSource = 'own' | 'gd' | 'manual';

export interface Game {
  /** URL slug — kebab-case, language-neutral. */
  slug: string;
  source: GameSource;
  /** Featured games show on the home hero / spotlight. */
  featured: boolean;
  title: LocalizedString;
  /** Short tagline for cards (~80 chars). */
  tagline: LocalizedString;
  /** Long description for /g/[slug] (~300-600 chars). */
  description: LocalizedString;
  /** Step-by-step controls / how to play. */
  instructions: LocalizedString;
  /** URL embedded in the iframe on /play/[slug]. */
  embedUrl: string;
  /** Public path or URL to the thumbnail. */
  thumbUrl: string;
  /** Min and max players supported. */
  minPlayers: number;
  maxPlayers: number;
  /** Category slugs the game belongs to. */
  categories: string[];
  /** ISO date the game went live in the catalog. */
  publishedAt: string;
}

export interface Category {
  slug: string;
  name: LocalizedString;
  /** Short blurb under the category title. */
  description: LocalizedString;
  /** Single-character emoji icon used in nav and headers. */
  icon: string;
}
