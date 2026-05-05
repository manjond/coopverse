'use client';

import { useState, useTransition } from 'react';
import { useAuth, SignInButton } from '@clerk/nextjs';
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

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      const result = await toggleFavorite(gameSlug);
      setFavorited(result.favorited);
    });
  }

  const baseClass =
    'absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-zinc-950/70 text-base backdrop-blur transition';

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button
          className={`${baseClass} text-zinc-400 hover:text-white`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          aria-label="Guardar en favoritos"
        >
          ♡
        </button>
      </SignInButton>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={favorited ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      className={`${baseClass} ${
        favorited ? 'text-fuchsia-400' : 'text-zinc-400 hover:text-white'
      } ${isPending ? 'opacity-50' : ''}`}
    >
      {favorited ? '♥' : '♡'}
    </button>
  );
}
