import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// next-intl handles locale detection and prefix rewriting.
export default createIntlMiddleware(routing);

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
