'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq, avg } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db/client';
import { ratings } from '@/db/schema';

export async function rateGame(gameSlug: string, stars: number): Promise<void> {
  if (stars < 1 || stars > 5) return;
  const { userId } = await auth();
  if (!userId) return; // silently skip if not logged in

  await db
    .insert(ratings)
    .values({ userId, gameSlug, stars })
    .onConflictDoUpdate({
      target: [ratings.userId, ratings.gameSlug],
      set: { stars },
    });

  revalidatePath(`/g/${gameSlug}`);
}

export async function getUserRating(userId: string, gameSlug: string): Promise<number | null> {
  const [row] = await db
    .select({ stars: ratings.stars })
    .from(ratings)
    .where(and(eq(ratings.userId, userId), eq(ratings.gameSlug, gameSlug)))
    .limit(1);
  return row?.stars ?? null;
}
