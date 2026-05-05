import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { GameCard } from '@/components/GameCard';
import { getAllGames, projectGame } from '@/db/queries';
import type { Locale } from '@/data/types';

export const revalidate = 3600;

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const lc = params.locale as Locale;
  return lc === 'es'
    ? { title: 'Todos los juegos', description: 'Catálogo completo de juegos cooperativos y multijugador en Coopverse. Gratis, sin descargas.' }
    : { title: 'All games', description: 'Full catalog of co-op and multiplayer browser games on Coopverse. Free, no downloads.' };
}

export default async function AllGamesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lc = locale as Locale;

  const rows = await getAllGames();
  const games = rows.map(projectGame);

  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <header className="mb-8 border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          {lc === 'es' ? 'Todos los juegos' : 'All games'}
        </h1>
        <p className="mt-2 text-zinc-400">
          {lc === 'es'
            ? `${games.length} juegos cooperativos y multijugador. Gratis, sin descargas.`
            : `${games.length} co-op and multiplayer games. Free, no downloads.`}
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {games.map((g) => (
          <GameCard key={g.slug} game={g} locale={lc} />
        ))}
      </div>
    </main>
  );
}
