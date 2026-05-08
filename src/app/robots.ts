import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

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
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
