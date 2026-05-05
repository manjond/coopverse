'use server';

import { eq, sql } from 'drizzle-orm';
import { db } from '@/db/client';
import { games } from '@/db/schema';

export async function incrementPlayCount(slug: string): Promise<void> {
  await db
    .update(games)
    .set({ playsCount: sql`${games.playsCount} + 1` })
    .where(eq(games.slug, slug));
}
