import { clerkMiddleware } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

// Wrap clerkMiddleware so that if Clerk fails on the Cloudflare Workers runtime
// (e.g. missing secret, edge-compat issue) the site still responds instead of
// returning a 500 for every page.
export default async function middleware(req: NextRequest) {
  try {
    const handler = clerkMiddleware((_auth, request) => intlMiddleware(request));
    return await handler(req, {} as Parameters<typeof handler>[1]);
  } catch {
    // Clerk unavailable — fall back to locale routing only.
    return intlMiddleware(req);
  }
}

export const config = {
  // Exclude api, admin, _next, _vercel, and any path with a file extension.
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
