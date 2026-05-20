import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

/**
 * robots.txt — open to all crawlers, exclude private/system routes.
 * /play pages use noindex metadata instead, so crawlers can see the
 * directive and keep /g/[slug] as the indexable game URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
