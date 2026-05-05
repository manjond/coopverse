import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// next-intl only — handles locale detection and prefix rewriting.
// Clerk auth is handled via ClerkProvider + cookies without needing
// middleware (auth() reads the session cookie directly in server components).
export default createIntlMiddleware(routing);

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
