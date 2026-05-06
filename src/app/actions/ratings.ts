'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { ratings } from '@/db/schema';

const SLUG_RE = /^[a-z0-9-]{1,96}$/;

export async function rateGame(gameSlug: string, stars: number): Promise<void> {
  if (!SLUG_RE.test(gameSlug)) return;
  if (stars < 1 || stars > 5) return;

  const { userId } = await auth();
  if (!userId) return;

  await db
    .insert(ratings)
    .values({ userId, gameSlug, stars })
    .onConflictDoUpdate({
      target: [ratings.userId, ratings.gameSlug],
      set: { stars },
    });
}

/** Server-side only — reads the authed user's own rating, never a third party's. */
export async function getMyRating(gameSlug: string): Promise<number | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const [row] = await db
    .select({ stars: ratings.stars })
    .from(ratings)
    .where(and(eq(ratings.userId, userId), eq(ratings.gameSlug, gameSlug)))
    .limit(1);

  return row?.stars ?? null;
}
