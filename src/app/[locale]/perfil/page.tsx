import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { GameCard } from '@/components/GameCard';
import { RecentlyPlayed } from '@/components/RecentlyPlayed';
import { getUserFavoriteGames, projectGame } from '@/db/queries';
import type { Locale } from '@/data/types';

export const dynamic = 'force-dynamic';

export default async function PerfilPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { userId } = await auth();
  if (!userId) redirect(`/${locale}`);

  const user = await currentUser();
  const favoriteRows = await getUserFavoriteGames(userId);
  const games = favoriteRows.map(projectGame);
  const lc = locale as Locale;

  const name = user?.firstName ?? user?.username ?? 'Jugador';

  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <header className="mb-8 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-4">
          {user?.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.imageUrl}
              alt={name}
              className="h-14 w-14 rounded-full border-2 border-zinc-700"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-white">{name}</h1>
            <p className="text-sm text-zinc-400">
              {lc === 'es'
                ? `${games.length} juego${games.length !== 1 ? 's' : ''} guardado${games.length !== 1 ? 's' : ''}`
                : `${games.length} saved game${games.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
      </header>

      <RecentlyPlayed locale={lc} />

      {games.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-10 text-center">
          <p className="text-2xl">♡</p>
          <p className="mt-3 text-zinc-400">
            {lc === 'es'
              ? 'Aún no has guardado ningún juego. Pulsa el corazón en cualquier juego para guardarlo aquí.'
              : "You haven't saved any games yet. Tap the heart on any game to save it here."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {games.map((g) => (
            <GameCard key={g.slug} game={g} locale={lc} isFavorited />
          ))}
        </div>
      )}
    </main>
  );
}
