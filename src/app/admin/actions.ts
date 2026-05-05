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
    // Artificial delay makes password brute-forcing ~1000x slower.
    await new Promise((r) => setTimeout(r, 1000));
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

/* ── Input validation ─────────────────────────────────────────────────────── */

function validateSlug(slug: string): string {
  if (!slug) throw new Error('Slug is required');
  if (!/^[a-z0-9-]+$/.test(slug))
    throw new Error('Slug must contain only lowercase letters, numbers, and hyphens');
  if (slug.length > 96) throw new Error('Slug is too long');
  return slug;
}

function validateUrl(url: string, field: string): string {
  if (!url) throw new Error(`${field} is required`);
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`${field} is not a valid URL`);
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:')
    throw new Error(`${field} must use http or https`);
  return url;
}

function validateOptionalUrl(url: string, field: string): string {
  if (!url || url === '/thumbs/placeholder.svg') return url;
  return validateUrl(url, field);
}

/* ── Games ────────────────────────────────────────────────────────────────── */

export async function createGame(formData: FormData) {
  await requireAdmin();
  const f = (k: string) => String(formData.get(k) ?? '').trim();

  const slug = validateSlug(f('slug'));
  const embedUrl = validateUrl(f('embedUrl'), 'Embed URL');
  const thumbUrl = validateOptionalUrl(f('thumbUrl') || '/thumbs/placeholder.svg', 'Thumbnail URL');

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
    embedUrl,
    thumbUrl,
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

  const embedUrl = validateUrl(f('embedUrl'), 'Embed URL');
  const thumbUrl = validateOptionalUrl(f('thumbUrl') || '/thumbs/placeholder.svg', 'Thumbnail URL');

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
      embedUrl,
      thumbUrl,
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
