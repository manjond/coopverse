import type { Post } from './types';

// ES — Import each post module and register it here.
// To add a new article: create the file in ./es/ and add an entry below.
import * as mejoresCoopES from './es/los-mejores-juegos-cooperativos';
import * as dos2jugadoresES from './es/juegos-para-2-jugadores-navegador';
import * as juegosiOES from './es/juegos-io-multijugador';
import * as coop3ES from './es/juegos-cooperativos-3-jugadores';
import * as sinDescargarES from './es/como-jugar-amigos-online-sin-descargar';
import * as coop4ES from './es/juegos-cooperativos-4-jugadores';
import * as trabajoES from './es/juegos-multijugador-trabajo';
import * as mesaES from './es/juegos-mesa-online-gratis';
import * as pikoparkES from './es/pikopark-guia-completa';
import * as parejaES from './es/juegos-online-pareja';
import * as movilES from './es/juegos-sin-descargar-movil';

export const ES_POSTS: Post[] = [
  { meta: mejoresCoopES.meta, Content: mejoresCoopES.default },
  { meta: dos2jugadoresES.meta, Content: dos2jugadoresES.default },
  { meta: juegosiOES.meta, Content: juegosiOES.default },
  { meta: coop3ES.meta, Content: coop3ES.default },
  { meta: sinDescargarES.meta, Content: sinDescargarES.default },
  { meta: coop4ES.meta, Content: coop4ES.default },
  { meta: trabajoES.meta, Content: trabajoES.default },
  { meta: mesaES.meta, Content: mesaES.default },
  { meta: pikoparkES.meta, Content: pikoparkES.default },
  { meta: parejaES.meta, Content: parejaES.default },
  { meta: movilES.meta, Content: movilES.default },
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
