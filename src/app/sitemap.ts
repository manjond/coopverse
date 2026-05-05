import type { MetadataRoute } from 'next';
import { getAllCategories, getAllGames } from '@/db/queries';
import { getAllSlugsForLocale } from '@/content/blog/registry';
import { routing } from '@/i18n/routing';

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://coopverse.io').replace(/\/$/, '');

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

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

  // Static pages — always present
  addPath('', 1.0);
  addPath('/privacy', 0.3);
  addPath('/terms', 0.3);
  addPath('/blog', 0.6);

  // Blog articles — static, no DB needed
  for (const locale of routing.locales) {
    for (const slug of getAllSlugsForLocale(locale)) {
      entries.push({
        url: `${BASE}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE}/${l}/blog/${slug}`]),
          ),
        },
      });
    }
  }

  // DB pages — skip gracefully if DB is unavailable (missing DATABASE_URL)
  try {
    const [cats, games] = await Promise.all([getAllCategories(), getAllGames()]);
    for (const c of cats) addPath(`/c/${c.slug}`, 0.7, c.createdAt);
    for (const g of games) addPath(`/g/${g.slug}`, 0.8, g.updatedAt);
  } catch {
    // DB not reachable — sitemap still returns static pages and blog
  }

  return entries;
}
