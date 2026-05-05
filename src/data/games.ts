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
      es: 'Plataformas cooperativas para 1 a 8 jugadores en navegador.',
      en: 'Cooperative platformer puzzles for 1 to 8 players, in your browser.',
    },
    description: {
      es: `Wobble Park Online es un plataformero cooperativo donde uno a ocho jugadores resuelven puzles trabajando en equipo. Apílate sobre tus amigos para alcanzar plataformas más altas, sostén botones de presión mientras otros cruzan trampas, y supera lava, sierras de fuego y plataformas que se desmoronan. Son 45 niveles repartidos en 9 packs de dificultad ascendente — de Solo a Squad pasando por Duo. Ningún nivel exige instalación: abres el navegador, te unes a una sala con un código de 4 letras, y juegas.`,
      en: `Wobble Park Online is a cooperative platformer where one to eight players solve puzzles together. Stack on your friends to reach higher platforms, hold pressure pads while teammates cross traps, and survive lava, fire bars and crumbling floors. 45 levels across 9 difficulty packs — Solo, Duo, Squad. No installs: open your browser, join a room with a 4-letter code, and play.`,
    },
    instructions: {
      es: `Crear o unirse a una sala con código de 4 letras • Mover: A/D o flechas • Saltar: espacio o W • Recoger / lanzar a un compañero: E • Apilarse: salta sobre la cabeza de otro jugador • Móvil: D-pad virtual + botón de salto`,
      en: `Create or join a room with a 4-letter code • Move: A/D or arrows • Jump: space or W • Pick up / throw a partner: E • Stack: jump onto another player's head • Mobile: virtual D-pad + jump button`,
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
      es: 'Demo placeholder — espera juegos reales tras integrar GameDistribution.',
      en: 'Placeholder demo — real games arrive once GameDistribution is wired.',
    },
    description: {
      es: 'Slot reservado para un juego real. Este placeholder existe sólo para que el grid de la home no salga vacío en el primer despliegue.',
      en: 'Reserved slot. Placeholder so the home grid is not empty on first deploy.',
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
