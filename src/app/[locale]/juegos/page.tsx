import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getAllGames, getAllCategories, projectGame, projectCategory } from '@/db/queries';
import { GamesGrid } from './GamesGrid';
import type { Locale } from '@/data/types';
import { localeAlternates } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lc = locale as Locale;
  const alternates = localeAlternates(locale, '/juegos');
  return lc === 'es'
    ? {
        title: 'Juegos multijugador online gratis sin descargar',
        description:
          'Catálogo de juegos cooperativos y multijugador online para jugar gratis en navegador: party, acción, plataformas, .io y juegos para amigos.',
        alternates,
      }
    : {
        title: 'Free online multiplayer games, no downloads',
        description:
          'A catalog of free co-op and multiplayer browser games: party, action, platformers, .io games and games to play with friends.',
        alternates,
      };
}

export default async function AllGamesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lc = locale as Locale;

  const [rows, catRows] = await Promise.all([getAllGames(), getAllCategories()]);
  const games = rows.map(projectGame);
  const categories = catRows.map(projectCategory);

  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          {lc === 'es' ? 'Todos los juegos' : 'All games'}
        </h1>
        <p className="mt-2 text-zinc-400">
          {lc === 'es'
            ? `${games.length} juegos cooperativos y multijugador. Gratis, sin descargas.`
            : `${games.length} co-op and multiplayer games. Free, no downloads.`}
        </p>
      </header>

      <GamesGrid games={games} categories={categories} locale={lc} />
    </main>
  );
}
