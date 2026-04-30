import type { MetadataRoute } from 'next';
import { getAllCategories, getAllGames } from '@/db/queries';
import { routing } from '@/i18n/routing';

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://coopverse.io').replace(/\/$/, '');

// Render the sitemap at request time, not during build. Sitemaps don't
// benefit from static gen — Google requests it once a day at most — and
// runtime rendering means the build never depends on DATABASE_URL being
// present in the build environment, plus admin-added games show up in
// the sitemap immediately without a redeploy.
export const dynamic = 'force-dynamic';
export const revalidate = 3600;

/**
 * Sitemap with hreflang alternates inline so Google ranks the Spanish
 * and English variants as equivalents instead of duplicates.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cats, games] = await Promise.all([getAllCategories(), getAllGames()]);

  const entries: MetadataRoute.Sitemap = [];

  // Helper — emits one sitemap entry per locale for a path, with
  // `alternates.languages` linking the locale variants together.
  function addPath(pathname: string, priority: number, lastMod?: Date) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE}/${locale}${pathname}`,
        lastModified: lastMod ?? new Date(),
        changeFrequency: 'weekly',
        priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE}/${l}${pathname}`]),
          ),
        },
      });
    }
  }

  addPath('', 1.0);                 // homepage
  addPath('/privacy', 0.3);
  addPath('/terms', 0.3);

  for (const c of cats) addPath(`/c/${c.slug}`, 0.7, c.createdAt);
  for (const g of games) addPath(`/g/${g.slug}`, 0.8, g.updatedAt);

  // /play/[slug] is intentionally excluded (we noindex it — see the
  // page's metadata.robots).

  return entries;
}
