import { getAllCategories, getAllGames } from '@/db/queries';
import { getAllSlugsForLocale } from '@/content/blog/registry';
import { routing } from '@/i18n/routing';
import { absoluteUrl, localeAlternateUrls } from '@/lib/site';

export const dynamic = 'force-dynamic';

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

function makeAlts(path: string, locales: readonly string[] = routing.locales) {
  return localeAlternateUrls(path, locales);
}

export async function GET() {
  const urls: string[] = [];

  // Static pages
  for (const path of ['', '/juegos', '/categorias', '/privacy', '/terms', '/blog']) {
    const priority = path === '' ? '1.0' : path === '/blog' ? '0.6' : '0.3';
    for (const locale of routing.locales) {
      urls.push(url(absoluteUrl(`/${locale}${path}`), priority, 'weekly', undefined, makeAlts(path)));
    }
  }

  // Blog articles: only include locales that actually have the article.
  const blogSlugsByLocale = Object.fromEntries(
    routing.locales.map((locale) => [locale, getAllSlugsForLocale(locale)]),
  );
  for (const locale of routing.locales) {
    for (const slug of blogSlugsByLocale[locale]) {
      const path = `/blog/${slug}`;
      const localesWithSlug = routing.locales.filter((l) =>
        blogSlugsByLocale[l].includes(slug),
      );
      urls.push(url(absoluteUrl(`/${locale}${path}`), '0.6', 'monthly', undefined, makeAlts(path, localesWithSlug)));
    }
  }

  // DB-backed pages — skip if DB unavailable
  try {
    const [cats, games] = await Promise.all([getAllCategories(), getAllGames()]);

    for (const c of cats) {
      const path = `/c/${c.slug}`;
      const lastmod = c.createdAt.toISOString().slice(0, 10);
      for (const locale of routing.locales) {
        urls.push(url(absoluteUrl(`/${locale}${path}`), '0.7', 'weekly', lastmod, makeAlts(path)));
      }
    }

    for (const g of games) {
      const path = `/g/${g.slug}`;
      const lastmod = g.updatedAt.toISOString().slice(0, 10);
      for (const locale of routing.locales) {
        urls.push(url(absoluteUrl(`/${locale}${path}`), '0.8', 'weekly', lastmod, makeAlts(path)));
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
