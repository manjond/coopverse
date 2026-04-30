'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { games, categories } from '@/db/schema';
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE_S,
  checkPassword,
  isAdmin,
  makeCookieValue,
} from '@/lib/admin-auth';

/* ── Auth ─────────────────────────────────────────────────────────────────── */

export async function login(formData: FormData) {
  const password = String(formData.get('password') ?? '');
  if (!checkPassword(password)) {
    // Server actions can't easily return an error to a client form
    // without state — for the MVP we just fall back to redirecting to
    // the login page (the form re-renders blank, which signals failure).
    redirect('/admin?e=1');
  }
  (await cookies()).set(ADMIN_COOKIE, makeCookieValue(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE_S,
  });
  redirect('/admin');
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect('/admin');
}

/* ── Guard helper ─────────────────────────────────────────────────────────── */

async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin');
}

/* ── Games ────────────────────────────────────────────────────────────────── */

export async function createGame(formData: FormData) {
  await requireAdmin();
  const f = (k: string) => String(formData.get(k) ?? '').trim();

  const slug = f('slug');
  if (!slug) throw new Error('slug required');

  await db.insert(games).values({
    slug,
    source: f('source') || 'manual',
    featured: formData.get('featured') === 'on',
    titleEs: f('titleEs'),
    titleEn: f('titleEn'),
    taglineEs: f('taglineEs'),
    taglineEn: f('taglineEn'),
    descriptionEs: f('descriptionEs'),
    descriptionEn: f('descriptionEn'),
    instructionsEs: f('instructionsEs') || '—',
    instructionsEn: f('instructionsEn') || '—',
    embedUrl: f('embedUrl'),
    thumbUrl: f('thumbUrl') || '/thumbs/placeholder.svg',
    minPlayers: Number(formData.get('minPlayers') ?? 1),
    maxPlayers: Number(formData.get('maxPlayers') ?? 1),
    categorySlugs: f('categorySlugs')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  });

  revalidatePath('/admin/games');
  revalidatePath('/');
  redirect('/admin/games');
}

export async function updateGame(slug: string, formData: FormData) {
  await requireAdmin();
  const f = (k: string) => String(formData.get(k) ?? '').trim();

  await db
    .update(games)
    .set({
      featured: formData.get('featured') === 'on',
      titleEs: f('titleEs'),
      titleEn: f('titleEn'),
      taglineEs: f('taglineEs'),
      taglineEn: f('taglineEn'),
      descriptionEs: f('descriptionEs'),
      descriptionEn: f('descriptionEn'),
      instructionsEs: f('instructionsEs') || '—',
      instructionsEn: f('instructionsEn') || '—',
      embedUrl: f('embedUrl'),
      thumbUrl: f('thumbUrl') || '/thumbs/placeholder.svg',
      minPlayers: Number(formData.get('minPlayers') ?? 1),
      maxPlayers: Number(formData.get('maxPlayers') ?? 1),
      categorySlugs: f('categorySlugs')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      updatedAt: new Date(),
    })
    .where(eq(games.slug, slug));

  revalidatePath('/admin/games');
  revalidatePath(`/admin/games/${slug}`);
  revalidatePath(`/g/${slug}`);
  revalidatePath('/');
  redirect('/admin/games');
}

export async function deleteGame(slug: string) {
  await requireAdmin();
  await db.delete(games).where(eq(games.slug, slug));
  revalidatePath('/admin/games');
  revalidatePath('/');
  redirect('/admin/games');
}

/* ── Categories ───────────────────────────────────────────────────────────── */

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const f = (k: string) => String(formData.get(k) ?? '').trim();
  await db.insert(categories).values({
    slug: f('slug'),
    nameEs: f('nameEs'),
    nameEn: f('nameEn'),
    descriptionEs: f('descriptionEs'),
    descriptionEn: f('descriptionEn'),
    icon: f('icon') || '🎮',
    sort: Number(formData.get('sort') ?? 0),
  });
  revalidatePath('/admin/categories');
  revalidatePath('/');
  redirect('/admin/categories');
}

export async function deleteCategory(slug: string) {
  await requireAdmin();
  await db.delete(categories).where(eq(categories.slug, slug));
  revalidatePath('/admin/categories');
  revalidatePath('/');
  redirect('/admin/categories');
}
