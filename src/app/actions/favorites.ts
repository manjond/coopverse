'use server';

import { and, eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { favorites } from '@/db/schema';
import { getSession } from '@/lib/auth';

const SLUG_RE = /^[a-z0-9-]{1,96}$/;

export async function toggleFavorite(gameSlug: string): Promise<{ favorited: boolean }> {
  if (!SLUG_RE.test(gameSlug)) throw new Error('Invalid game slug');

  const session = await getSession();
  if (!session) throw new Error('Debes iniciar sesión para guardar favoritos.');

  const { userId } = session;

  const [existing] = await db
    .select({ id: favorites.id })
    .from(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.gameSlug, gameSlug)))
    .limit(1);

  if (existing) {
    await db.delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.gameSlug, gameSlug)));
    return { favorited: false };
  }

  await db.insert(favorites).values({ userId, gameSlug });
  return { favorited: true };
}
