'use client';

import { useAuth, UserButton } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import Link from 'next/link';

/**
 * Auth controls for the header.
 * Uses redirect (not modal) so it works even if Clerk JS loads slowly.
 * Shows sign-in link when logged out, user avatar when logged in.
 */
export function AuthButtons() {
  const { isSignedIn, isLoaded } = useAuth();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'es';

  if (!isLoaded) {
    return <div className="h-8 w-16 animate-pulse rounded-lg bg-zinc-800" />;
  }

  if (isSignedIn) {
    return (
      <UserButton
        appearance={{
          elements: { avatarBox: 'h-8 w-8' },
        }}
      />
    );
  }

  return (
    <Link
      href={`/${locale}/sign-in`}
      className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-300 transition hover:border-cyan-500/60 hover:text-white"
    >
      Entrar
    </Link>
  );
}
