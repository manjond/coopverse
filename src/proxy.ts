import { clerkMiddleware } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export default async function proxy(req: NextRequest) {
  try {
    const handler = clerkMiddleware((_auth, request) => intlMiddleware(request));
    return await handler(req, {} as Parameters<typeof handler>[1]);
  } catch {
    return intlMiddleware(req);
  }
}

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
