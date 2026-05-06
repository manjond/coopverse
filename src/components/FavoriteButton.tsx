'use client';

import { useState, useTransition } from 'react';
import { useAuth } from '@clerk/nextjs';
import { toggleFavorite } from '@/app/actions/favorites';

export function FavoriteButton({
  gameSlug,
  initialFavorited,
}: {
  gameSlug: string;
  initialFavorited: boolean;
}) {
  const { isSignedIn } = useAuth();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [isPending, startTransition] = useTransition();

  // When not signed in, show a non-interactive ghost heart.
  // pointer-events-none ensures the card link still works — no click blocked.
  if (!isSignedIn) {
    return (
      <span
        className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-zinc-950/70 text-base text-zinc-500 backdrop-blur pointer-events-none"
        aria-hidden
      >
        ♡
      </span>
    );
  }

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      const result = await toggleFavorite(gameSlug);
      setFavorited(result.favorited);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={favorited ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      className={`absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-zinc-950/70 text-base backdrop-blur transition ${
        favorited ? 'text-fuchsia-400' : 'text-zinc-400 hover:text-white'
      } ${isPending ? 'opacity-50' : ''}`}
    >
      {favorited ? '♥' : '♡'}
    </button>
  );
}
