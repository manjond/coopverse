import { clerkMiddleware } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

// Auth is optional everywhere — we don't force login on any route.
// clerkMiddleware runs first (attaches auth context), then next-intl
// runs to handle locale detection and prefix rewriting.
export default clerkMiddleware(async (_auth, req) => {
  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
