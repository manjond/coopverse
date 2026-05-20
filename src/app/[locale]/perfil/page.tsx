import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { GameCard } from '@/components/GameCard';
import { RecentlyPlayed } from '@/components/RecentlyPlayed';
import { getUserFavoriteGames, projectGame } from '@/db/queries';
import { getSession } from '@/lib/auth';
import type { Locale } from '@/data/types';

export const dynamic = 'force-dynamic';
export const metadata = {
  robots: { index: false, follow: false },
};

export default async function PerfilPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getSession();
  if (!session) redirect(`/${locale}/sign-in`);

  const favoriteRows = await getUserFavoriteGames(session.userId);
  const games = favoriteRows.map(projectGame);
  const lc = locale as Locale;

  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <header className="mb-8 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-2xl font-bold text-zinc-950">
            {session.name[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{session.name}</h1>
            <p className="text-sm text-zinc-400">{session.email}</p>
            <p className="text-sm text-zinc-500">
              {games.length} {lc === 'es'
                ? `juego${games.length !== 1 ? 's' : ''} guardado${games.length !== 1 ? 's' : ''}`
                : `saved game${games.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
      </header>

      <RecentlyPlayed locale={lc} />

      {games.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-10 text-center mt-8">
          <p className="text-2xl">♡</p>
          <p className="mt-3 text-zinc-400">
            {lc === 'es'
              ? 'Aún no has guardado ningún juego. Pulsa el corazón en cualquier juego.'
              : "You haven't saved any games yet. Tap the heart on any game."}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {games.map((g) => (
            <GameCard key={g.slug} game={g} locale={lc} isFavorited />
          ))}
        </div>
      )}
    </main>
  );
}
