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
import { routing } from '@/i18n/routing';

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

function validateSlug(slug: string, maxLength = 96): string {
  if (!slug) throw new Error('Slug is required');
  if (!/^[a-z0-9-]+$/.test(slug))
    throw new Error('Slug must contain only lowercase letters, numbers, and hyphens');
  if (slug.length > maxLength) throw new Error('Slug is too long');
  return slug;
}

function validateRequiredText(value: string, field: string, maxLength = 5000): string {
  if (!value) throw new Error(`${field} is required`);
  if (value.length > maxLength) throw new Error(`${field} is too long`);
  return value;
}

function validateSource(source: string): 'manual' | 'own' | 'gd' {
  if (source === 'manual' || source === 'own' || source === 'gd') return source;
  throw new Error('Source must be manual, own, or gd');
}

function validatePlayerCount(value: FormDataEntryValue | null, field: string): number {
  const n = Number(value ?? 1);
  if (!Number.isInteger(n) || n < 1 || n > 500) {
    throw new Error(`${field} must be a whole number between 1 and 500`);
  }
  return n;
}

function validateIntegerRange(
  value: FormDataEntryValue | null,
  field: string,
  min: number,
  max: number,
): number {
  const n = Number(value ?? min);
  if (!Number.isInteger(n) || n < min || n > max) {
    throw new Error(`${field} must be a whole number between ${min} and ${max}`);
  }
  return n;
}

function validatePlayerRange(minPlayers: number, maxPlayers: number): void {
  if (minPlayers > maxPlayers) throw new Error('Min players cannot be greater than max players');
}

function parseCategorySlugs(value: string): string[] {
  const slugs = value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  for (const slug of slugs) validateSlug(slug, 64);
  return slugs;
}

function validateEmbedUrl(url: string): string {
  if (!url) throw new Error('Embed URL is required');
  if (url === 'about:blank') return url;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('Embed URL is not a valid URL');
  }
  const isLocalDevUrl =
    parsed.protocol === 'http:' &&
    ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname);
  if (parsed.protocol !== 'https:' && !isLocalDevUrl) {
    throw new Error('Embed URL must use HTTPS');
  }
  return url;
}

function validateAssetUrl(url: string, field: string): string {
  if (!url || url === '/thumbs/placeholder.svg') return url;
  if (url.startsWith('/') && !url.startsWith('//') && !/[\r\n]/.test(url)) return url;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`${field} is not a valid URL or local path`);
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error(`${field} must use http, https, or a local /path`);
  }
  return url;
}

function revalidatePublicPages(slug?: string) {
  for (const locale of routing.locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/juegos`);
    if (slug) {
      revalidatePath(`/${locale}/g/${slug}`);
      revalidatePath(`/${locale}/play/${slug}`);
    }
  }
  revalidatePath('/sitemap.xml');
}

/* ── Games ────────────────────────────────────────────────────────────────── */

export async function createGame(formData: FormData) {
  await requireAdmin();
  const f = (k: string) => String(formData.get(k) ?? '').trim();

  const slug = validateSlug(f('slug'));
  const embedUrl = validateEmbedUrl(f('embedUrl'));
  const thumbUrl = validateAssetUrl(f('thumbUrl') || '/thumbs/placeholder.svg', 'Thumbnail URL');
  const minPlayers = validatePlayerCount(formData.get('minPlayers'), 'Min players');
  const maxPlayers = validatePlayerCount(formData.get('maxPlayers'), 'Max players');
  validatePlayerRange(minPlayers, maxPlayers);

  await db.insert(games).values({
    slug,
    source: validateSource(f('source') || 'manual'),
    featured: formData.get('featured') === 'on',
    titleEs: validateRequiredText(f('titleEs'), 'Title ES', 160),
    titleEn: validateRequiredText(f('titleEn'), 'Title EN', 160),
    taglineEs: validateRequiredText(f('taglineEs'), 'Tagline ES', 220),
    taglineEn: validateRequiredText(f('taglineEn'), 'Tagline EN', 220),
    descriptionEs: validateRequiredText(f('descriptionEs'), 'Description ES'),
    descriptionEn: validateRequiredText(f('descriptionEn'), 'Description EN'),
    instructionsEs: f('instructionsEs') || '—',
    instructionsEn: f('instructionsEn') || '—',
    embedUrl,
    thumbUrl,
    minPlayers,
    maxPlayers,
    categorySlugs: parseCategorySlugs(f('categorySlugs')),
  });

  revalidatePath('/admin/games');
  revalidatePublicPages(slug);
  redirect('/admin/games');
}

export async function updateGame(slug: string, formData: FormData) {
  await requireAdmin();
  const f = (k: string) => String(formData.get(k) ?? '').trim();
  const safeSlug = validateSlug(slug);

  const embedUrl = validateEmbedUrl(f('embedUrl'));
  const thumbUrl = validateAssetUrl(f('thumbUrl') || '/thumbs/placeholder.svg', 'Thumbnail URL');
  const minPlayers = validatePlayerCount(formData.get('minPlayers'), 'Min players');
  const maxPlayers = validatePlayerCount(formData.get('maxPlayers'), 'Max players');
  validatePlayerRange(minPlayers, maxPlayers);

  await db
    .update(games)
    .set({
      featured: formData.get('featured') === 'on',
      titleEs: validateRequiredText(f('titleEs'), 'Title ES', 160),
      titleEn: validateRequiredText(f('titleEn'), 'Title EN', 160),
      taglineEs: validateRequiredText(f('taglineEs'), 'Tagline ES', 220),
      taglineEn: validateRequiredText(f('taglineEn'), 'Tagline EN', 220),
      descriptionEs: validateRequiredText(f('descriptionEs'), 'Description ES'),
      descriptionEn: validateRequiredText(f('descriptionEn'), 'Description EN'),
      instructionsEs: f('instructionsEs') || '—',
      instructionsEn: f('instructionsEn') || '—',
      embedUrl,
      thumbUrl,
      minPlayers,
      maxPlayers,
      categorySlugs: parseCategorySlugs(f('categorySlugs')),
      updatedAt: new Date(),
    })
    .where(eq(games.slug, safeSlug));

  revalidatePath('/admin/games');
  revalidatePath(`/admin/games/${safeSlug}`);
  revalidatePublicPages(safeSlug);
  redirect('/admin/games');
}

export async function deleteGame(slug: string) {
  await requireAdmin();
  const safeSlug = validateSlug(slug);
  await db.delete(games).where(eq(games.slug, safeSlug));
  revalidatePath('/admin/games');
  revalidatePublicPages(safeSlug);
  redirect('/admin/games');
}

/* ── Categories ───────────────────────────────────────────────────────────── */

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const f = (k: string) => String(formData.get(k) ?? '').trim();
  const slug = validateSlug(f('slug'), 64);
  await db.insert(categories).values({
    slug,
    nameEs: validateRequiredText(f('nameEs'), 'Name ES', 80),
    nameEn: validateRequiredText(f('nameEn'), 'Name EN', 80),
    descriptionEs: validateRequiredText(f('descriptionEs'), 'Description ES', 240),
    descriptionEn: validateRequiredText(f('descriptionEn'), 'Description EN', 240),
    icon: validateRequiredText(f('icon') || '🎮', 'Icon', 16),
    sort: validateIntegerRange(formData.get('sort'), 'Sort', 0, 999),
  });
  revalidatePath('/admin/categories');
  revalidatePublicPages();
  redirect('/admin/categories');
}

export async function deleteCategory(slug: string) {
  await requireAdmin();
  const safeSlug = validateSlug(slug, 64);
  await db.delete(categories).where(eq(categories.slug, safeSlug));
  revalidatePath('/admin/categories');
  revalidatePublicPages();
  redirect('/admin/categories');
}
