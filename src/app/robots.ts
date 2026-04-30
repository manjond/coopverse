import type { MetadataRoute } from 'next';

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://coopverse.io').replace(/\/$/, '');

/**
 * robots.txt — open to all crawlers, exclude /admin and /play
 * (the iframe view is duplicate-content territory; we want Google
 * indexing /g/[slug] instead).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/*/play/'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
