'use server';

import { and, eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { ratings } from '@/db/schema';
import { getSession } from '@/lib/auth';

const SLUG_RE = /^[a-z0-9-]{1,96}$/;

export async function rateGame(gameSlug: string, stars: number): Promise<void> {
  if (!SLUG_RE.test(gameSlug) || stars < 1 || stars > 5) return;

  const session = await getSession();
  if (!session) return;

  await db.insert(ratings)
    .values({ userId: session.userId, gameSlug, stars })
    .onConflictDoUpdate({
      target: [ratings.userId, ratings.gameSlug],
      set: { stars },
    });
}

export async function getMyRating(gameSlug: string): Promise<number | null> {
  const session = await getSession();
  if (!session) return null;

  const [row] = await db
    .select({ stars: ratings.stars })
    .from(ratings)
    .where(and(eq(ratings.userId, session.userId), eq(ratings.gameSlug, gameSlug)))
    .limit(1);

  return row?.stars ?? null;
}
