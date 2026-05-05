import { getAllCategories, getAllGames } from '@/db/queries';
import { getAllSlugsForLocale } from '@/content/blog/registry';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-dynamic';

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://coopverse.io').replace(/\/$/, '');

function url(
  loc: string,
  priority: string,
  changefreq: string,
  lastmod?: string,
  alternates?: Record<string, string>,
) {
  const alts = alternates
    ? Object.entries(alternates)
        .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`)
        .join('\n')
    : '';

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod ?? new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alts}
  </url>`;
}

function makeAlts(path: string) {
  return Object.fromEntries(
    routing.locales.map((l) => [l, `${BASE}/${l}${path}`]),
  );
}

export async function GET() {
  const urls: string[] = [];

  // Static pages
  for (const path of ['', '/privacy', '/terms', '/blog']) {
    const priority = path === '' ? '1.0' : path === '/blog' ? '0.6' : '0.3';
    for (const locale of routing.locales) {
      urls.push(url(`${BASE}/${locale}${path}`, priority, 'weekly', undefined, makeAlts(path)));
    }
  }

  // Blog articles (static — no DB needed)
  for (const slug of getAllSlugsForLocale('es')) {
    const path = `/blog/${slug}`;
    for (const locale of routing.locales) {
      urls.push(url(`${BASE}/${locale}${path}`, '0.6', 'monthly', undefined, makeAlts(path)));
    }
  }

  // DB-backed pages — skip if DB unavailable
  try {
    const [cats, games] = await Promise.all([getAllCategories(), getAllGames()]);

    for (const c of cats) {
      const path = `/c/${c.slug}`;
      const lastmod = c.createdAt.toISOString().slice(0, 10);
      for (const locale of routing.locales) {
        urls.push(url(`${BASE}/${locale}${path}`, '0.7', 'weekly', lastmod, makeAlts(path)));
      }
    }

    for (const g of games) {
      const path = `/g/${g.slug}`;
      const lastmod = g.updatedAt.toISOString().slice(0, 10);
      for (const locale of routing.locales) {
        urls.push(url(`${BASE}/${locale}${path}`, '0.8', 'weekly', lastmod, makeAlts(path)));
      }
    }
  } catch {
    // DB unavailable — sitemap still returns static pages
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
