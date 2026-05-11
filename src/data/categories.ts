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
      es: 'Juegos donde lo importante es ayudarse: resolver, construir o sobrevivir juntos.',
      en: 'Games where the goal is to help each other: solve, build, or survive together.',
    },
    icon: '🤝',
  },
  {
    slug: 'multijugador',
    name: { es: 'Multijugador', en: 'Multiplayer' },
    description: {
      es: 'Partidas con otras personas, ya sea con amigos o con jugadores online.',
      en: 'Play with other people, either friends or players online.',
    },
    icon: '🎮',
  },
  {
    slug: 'dos-jugadores',
    name: { es: '2 Jugadores', en: '2 Players' },
    description: {
      es: 'Perfectos para jugar con otra persona, en el mismo teclado o por internet.',
      en: 'Perfect for playing with one other person, on the same keyboard or online.',
    },
    icon: '👥',
  },
  {
    slug: 'cuatro-jugadores',
    name: { es: '4 Jugadores', en: '4 Players' },
    description: {
      es: 'Juegos para grupos pequeños: amigos, familia o una llamada de Discord.',
      en: 'Games for small groups: friends, family, or a Discord call.',
    },
    icon: '🎉',
  },
  {
    slug: 'plataformas',
    name: { es: 'Plataformas', en: 'Platformers' },
    description: {
      es: 'Saltos, trampas y coordinación para llegar al final del nivel.',
      en: 'Jumps, traps, and teamwork to reach the end of the level.',
    },
    icon: '🪜',
  },
  {
    slug: 'puzzle',
    name: { es: 'Puzzle', en: 'Puzzle' },
    description: {
      es: 'Retos de lógica para pensar con calma y encontrar la solución.',
      en: 'Logic challenges where you slow down, think, and find the solution.',
    },
    icon: '🧩',
  },
];

export function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
