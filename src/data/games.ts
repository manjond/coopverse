import type { Game } from './types';

export const GAMES: Game[] = [
  {
    slug: 'wobble-park',
    source: 'own',
    featured: true,
    title: {
      es: 'Wobble Park Online',
      en: 'Wobble Park Online',
    },
    tagline: {
      es: 'Salta, empuja y resuelve niveles con hasta 8 personas, sin instalar nada.',
      en: 'Jump, push, and solve levels with up to 8 people, no install needed.',
    },
    description: {
      es: `Wobble Park Online es un juego cooperativo de plataformas. Entras desde el navegador, creas una sala y compartes un código de 4 letras. El objetivo es simple: llegar al final de cada nivel ayudándoos entre todos. A veces tendrás que sujetar un botón, otras apilarte sobre otro jugador o cruzar trampas en el momento justo. Tiene 45 niveles, desde retos para una persona hasta pruebas pensadas para grupos.`,
      en: `Wobble Park Online is a cooperative platform game. Open it in your browser, create a room, and share a 4-letter code. The goal is simple: reach the end of each level by helping each other. Sometimes you hold a button, sometimes you stack on another player, and sometimes you cross traps at just the right moment. It has 45 levels, from solo challenges to group stages.`,
    },
    instructions: {
      es: `Crea una sala o entra con un código de 4 letras. Muévete con A/D o las flechas. Salta con espacio o W. Pulsa E para recoger o lanzar a un compañero. Para apilaros, salta sobre la cabeza de otro jugador.`,
      en: `Create a room or join with a 4-letter code. Move with A/D or the arrow keys. Jump with Space or W. Press E to pick up or throw a teammate. To stack, jump onto another player's head.`,
    },
    embedUrl:
      process.env.NEXT_PUBLIC_PIKOPARK_URL ?? 'https://pikopark-online.vercel.app',
    thumbUrl: '/thumbs/placeholder.svg',
    minPlayers: 1,
    maxPlayers: 8,
    categories: ['cooperativos', 'multijugador', 'plataformas', 'cuatro-jugadores'],
    publishedAt: '2026-04-29',
  },
  {
    slug: 'placeholder-skribbl',
    source: 'manual',
    featured: false,
    title: { es: 'Demo: Skribbl-style', en: 'Demo: Skribbl-style' },
    tagline: {
      es: 'Ficha de prueba para validar el catálogo antes de publicar juegos reales.',
      en: 'Test listing used to validate the catalog before publishing real games.',
    },
    description: {
      es: 'Esta ficha no es un juego final. Sirve para comprobar que las tarjetas, categorías y páginas funcionan antes de añadir contenido real.',
      en: 'This is not a final game. It is used to check that cards, categories, and pages work before adding real content.',
    },
    instructions: { es: '—', en: '—' },
    embedUrl: 'about:blank',
    thumbUrl: '/thumbs/placeholder.svg',
    minPlayers: 2,
    maxPlayers: 8,
    categories: ['multijugador', 'dos-jugadores'],
    publishedAt: '2026-04-29',
  },
];

export function gameBySlug(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}

export function gamesByCategory(categorySlug: string): Game[] {
  return GAMES.filter((g) => g.categories.includes(categorySlug));
}

export function featuredGames(): Game[] {
  return GAMES.filter((g) => g.featured);
}

export function popularGames(limit = 12): Game[] {
  return [...GAMES]
    .sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
    .slice(0, limit);
}
