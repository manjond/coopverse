'use client';

import { useState, useTransition } from 'react';
import { rateGame } from '@/app/actions/ratings';

export function StarRating({
  gameSlug,
  initialRating,
  locale,
  isLoggedIn = false,
}: {
  gameSlug: string;
  initialRating: number | null;
  locale: string;
  isLoggedIn?: boolean;
}) {
  const [rating, setRating] = useState(initialRating ?? 0);
  const [hover, setHover] = useState(0);
  const [isPending, startTransition] = useTransition();
  const lc = locale;

  if (!isLoggedIn) {
    return (
      <p className="text-xs text-zinc-600">
        {lc === 'es' ? 'Inicia sesión para valorar' : 'Sign in to rate'}
      </p>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await rateGame(gameSlug, star);
              setRating(star);
            });
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-xl transition-transform hover:scale-110 disabled:opacity-50"
        >
          <span className={hover ? (star <= hover ? 'text-amber-400' : 'text-zinc-700') : (star <= rating ? 'text-amber-400' : 'text-zinc-700')}>
            ★
          </span>
        </button>
      ))}
      {rating > 0 && (
        <span className="ml-1 text-xs text-zinc-500">{rating}/5</span>
      )}
    </div>
  );
}
