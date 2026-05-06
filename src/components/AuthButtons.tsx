'use client';

import { useAuth, UserButton } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export function AuthButtons() {
  const { isSignedIn, isLoaded } = useAuth();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'es';

  // Show avatar only once Clerk confirms signed-in state.
  // In all other cases (loading, not signed in, Clerk JS failure) show the link.
  if (isLoaded && isSignedIn) {
    return <UserButton appearance={{ elements: { avatarBox: 'h-8 w-8' } }} />;
  }

  return (
    <Link
      href={`/${locale}/sign-in`}
      className="rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-1.5 text-sm font-semibold text-white transition hover:border-cyan-500 hover:bg-zinc-700"
    >
      Entrar
    </Link>
  );
}
