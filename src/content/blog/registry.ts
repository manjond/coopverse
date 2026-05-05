import type { Post } from './types';

// ES — Import each post module and register it here.
// To add a new article: create the file in ./es/ and add an entry below.
import * as mejoresCoopES from './es/los-mejores-juegos-cooperativos';

export const ES_POSTS: Post[] = [
  { meta: mejoresCoopES.meta, Content: mejoresCoopES.default },
];

// EN — empty until ES traction is proven (see PORTAL_PLAN.md §3).
export const EN_POSTS: Post[] = [];

export function getPostsByLocale(locale: string): Post[] {
  return locale === 'en' ? EN_POSTS : ES_POSTS;
}

export function getPostBySlug(locale: string, slug: string): Post | undefined {
  return getPostsByLocale(locale).find((p) => p.meta.slug === slug);
}

export function getAllSlugsForLocale(locale: string): string[] {
  return getPostsByLocale(locale).map((p) => p.meta.slug);
}
