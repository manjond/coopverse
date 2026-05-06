import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Game, Locale } from '@/data/types';
import { FavoriteButton } from './FavoriteButton';

const NEW_DAYS = 14; // games added within this window get the "NUEVO" badge

export function GameCard({
  game,
  locale,
  isFavorited = false,
}: {
  game: Game;
  locale: Locale;
  isFavorited?: boolean;
}) {
  const isNew = game.publishedAt
    ? (Date.now() - new Date(game.publishedAt).getTime()) < NEW_DAYS * 86_400_000
    : false;

  return (
    <Link
      href={`/g/${game.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-900/40 transition hover:-translate-y-0.5 hover:border-fuchsia-500/40 hover:shadow-lg hover:shadow-fuchsia-500/10"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-fuchsia-900/40 to-cyan-900/40">
        <Image
          src={game.thumbUrl}
          alt={game.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex gap-1">
          {game.featured && (
            <span className="rounded-md bg-amber-400/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-950">
              ★ Featured
            </span>
          )}
          {isNew && !game.featured && (
            <span className="rounded-md bg-cyan-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-950">
              {locale === 'es' ? 'Nuevo' : 'New'}
            </span>
          )}
        </div>
        <span className="absolute right-2 top-2 rounded-md bg-zinc-950/80 px-2 py-0.5 text-[10px] font-medium text-zinc-200">
          {game.minPlayers === game.maxPlayers
            ? `${game.minPlayers}p`
            : `${game.minPlayers}–${game.maxPlayers}p`}
        </span>
        <FavoriteButton gameSlug={game.slug} initialFavorited={isFavorited} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white">
          {game.title[locale]}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
          {game.tagline[locale]}
        </p>
        {(game.playsCount ?? 0) > 0 && (
          <p className="mt-2 text-xs text-zinc-600">
            {game.playsCount!.toLocaleString()} {locale === 'es' ? 'partidas' : 'plays'}
          </p>
        )}
      </div>
    </Link>
  );
}
