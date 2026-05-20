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

export type GameSource =
  | 'own'
  | 'crazygames'
  | 'gamedistribution'
  | 'gd'
  | 'gamepix'
  | 'gamezop'
  | 'famobi'
  | 'itch'
  | 'direct'
  | 'manual';

export interface Game {
  /** URL slug — kebab-case, language-neutral. */
  slug: string;
  source: GameSource;
  /** Featured games show on the home hero / spotlight. */
  featured: boolean;
  title: LocalizedString;
  /** One-sentence summary shown on cards. Keep it plain and specific. */
  tagline: LocalizedString;
  /** Human-friendly explanation for the game detail page. */
  description: LocalizedString;
  /** Controls and first steps, written for someone opening the game cold. */
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
  /** Total play sessions recorded. Optional — may be absent on seed data. */
  playsCount?: number;
}

export interface Category {
  slug: string;
  name: LocalizedString;
  /** Short explanation under the category title. */
  description: LocalizedString;
  /** Single-character emoji icon used in nav and headers. */
  icon: string;
}
