import type { Category } from './types';

/**
 * Initial category list. Slugs are SEO-targeted Spanish keywords found
 * during research (PORTAL_PLAN.md §2). When we add the DB (Step 11)
 * this seed is replaced by a Postgres table — interface stays identical.
 */
export const CATEGORIES: Category[] = [
  {
    slug: 'cooperativos',
    name: { es: 'Cooperativos', en: 'Co-op' },
    description: {
      es: 'Juegos para superar retos juntos sin competir.',
      en: 'Games where you team up instead of competing.',
    },
    icon: '🤝',
  },
  {
    slug: 'multijugador',
    name: { es: 'Multijugador', en: 'Multiplayer' },
    description: {
      es: 'Salas online con desconocidos o con tus amigos.',
      en: 'Online rooms with strangers or your friends.',
    },
    icon: '🎮',
  },
  {
    slug: 'dos-jugadores',
    name: { es: '2 Jugadores', en: '2 Players' },
    description: {
      es: 'Para jugar en pareja, en local o en línea.',
      en: 'Play in pairs, local or online.',
    },
    icon: '👥',
  },
  {
    slug: 'cuatro-jugadores',
    name: { es: '4 Jugadores', en: '4 Players' },
    description: {
      es: 'Salas grandes para llenar el chat de risas.',
      en: 'Bigger rooms to fill the chat with laughs.',
    },
    icon: '🎉',
  },
  {
    slug: 'plataformas',
    name: { es: 'Plataformas', en: 'Platformers' },
    description: {
      es: 'Saltos, trampas y precisión.',
      en: 'Jumps, traps and precision.',
    },
    icon: '🪜',
  },
  {
    slug: 'puzzle',
    name: { es: 'Puzzle', en: 'Puzzle' },
    description: {
      es: 'Pon a prueba tu cerebro y trabajo en equipo.',
      en: 'Test your brain and teamwork.',
    },
    icon: '🧩',
  },
];

export function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
