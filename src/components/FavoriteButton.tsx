'use client';

import { useEffect, useState, useTransition } from 'react';
import { toggleFavorite } from '@/app/actions/favorites';

function isLoggedInClient(): boolean {
  try {
    return document.cookie.includes('cv_display=');
  } catch {
    return false;
  }
}

export function FavoriteButton({
  gameSlug,
  initialFavorited,
}: {
  gameSlug: string;
  initialFavorited: boolean;
}) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoggedIn(isLoggedInClient());
  }, []);

  if (!loggedIn) {
    return (
      <span
        className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-zinc-950/70 text-base text-zinc-600 backdrop-blur pointer-events-none"
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
