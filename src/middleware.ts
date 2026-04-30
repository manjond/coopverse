import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Locale-detection middleware. Runs on every request, looks at:
 *   1. URL prefix (/es/... or /en/...)
 *   2. Cookie set by previous visit
 *   3. Accept-Language header
 *   4. Falls back to `defaultLocale` (es)
 * Then rewrites the request to the right locale variant.
 */
export default createMiddleware(routing);

export const config = {
  // Match every path EXCEPT internal Next.js paths and static assets.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
