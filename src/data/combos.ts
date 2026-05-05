/**
 * Programmatic SEO combos — category × player-count pairs.
 * Each combo becomes a static page at /[locale]/lista/[slug] that
 * targets a long-tail keyword like "juegos cooperativos para 2 jugadores".
 *
 * Strategy (from PORTAL_PLAN.md §2): combining 6 categories × 4 player
 * counts = 24 pages × 2 locales = 48 SEO doors, each targeting a
 * distinct keyword with very little competition.
 */

import type { Locale } from './types';

export interface Combo {
  slug: string; // URL slug, e.g. "cooperativos-2-jugadores"
  categorySlug: string;
  minPlayers: number;
  maxPlayers: number;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  h1: Record<Locale, string>;
}

const PLAYER_LABELS: Record<Locale, Record<number, string>> = {
  es: { 1: '1 jugador', 2: '2 jugadores', 3: '3 jugadores', 4: '4 jugadores' },
  en: { 1: '1 player', 2: '2 players', 3: '3 players', 4: '4 players' },
};

const CAT_LABELS: Record<Locale, Record<string, string>> = {
  es: {
    cooperativos: 'cooperativos',
    multijugador: 'multijugador',
    'dos-jugadores': 'para 2 jugadores',
    'cuatro-jugadores': 'para 4 jugadores',
    plataformas: 'de plataformas',
    puzzle: 'de puzzle',
  },
  en: {
    cooperativos: 'co-op',
    multijugador: 'multiplayer',
    'dos-jugadores': '2-player',
    'cuatro-jugadores': '4-player',
    plataformas: 'platformer',
    puzzle: 'puzzle',
  },
};

const CATEGORY_SLUGS = [
  'cooperativos',
  'multijugador',
  'plataformas',
  'puzzle',
];

const PLAYER_COUNTS = [1, 2, 4];

export const COMBOS: Combo[] = CATEGORY_SLUGS.flatMap((cat) =>
  PLAYER_COUNTS.map((n) => {
    const slug = `${cat}-${n}-${n === 1 ? 'jugador' : 'jugadores'}`;
    return {
      slug,
      categorySlug: cat,
      minPlayers: 1,
      maxPlayers: n,
      title: {
        es: `Juegos ${CAT_LABELS.es[cat]} para ${PLAYER_LABELS.es[n]} | Coopverse`,
        en: `${n === 1 ? 'Solo' : n + '-Player'} ${CAT_LABELS.en[cat]} browser games | Coopverse`,
      },
      description: {
        es: `Los mejores juegos ${CAT_LABELS.es[cat]} para ${PLAYER_LABELS.es[n]} en el navegador, sin descargar nada. Juega gratis en Coopverse.`,
        en: `Best free ${CAT_LABELS.en[cat]} browser games for ${PLAYER_LABELS.en[n]}. No downloads. Play free on Coopverse.`,
      },
      h1: {
        es: `Juegos ${CAT_LABELS.es[cat]} para ${PLAYER_LABELS.es[n]}`,
        en: `${n === 1 ? 'Solo' : n + '-player'} ${CAT_LABELS.en[cat]} games`,
      },
    } satisfies Combo;
  }),
);

export function comboBySlug(slug: string): Combo | undefined {
  return COMBOS.find((c) => c.slug === slug);
}
