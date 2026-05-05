'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db/client';
import { favorites } from '@/db/schema';

export async function toggleFavorite(gameSlug: string): Promise<{ favorited: boolean }> {
  const { userId } = await auth();
  if (!userId) throw new Error('Debes iniciar sesión para guardar favoritos.');

  const [existing] = await db
    .select({ id: favorites.id })
    .from(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.gameSlug, gameSlug)))
    .limit(1);

  if (existing) {
    await db
      .delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.gameSlug, gameSlug)));
    revalidatePath('/');
    return { favorited: false };
  }

  await db.insert(favorites).values({ userId, gameSlug });
  revalidatePath('/');
  return { favorited: true };
}
