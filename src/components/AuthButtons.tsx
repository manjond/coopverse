'use client';

import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';

/**
 * Auth controls for the header. Client component because Clerk's hooks
 * are client-only. Shows a sign-in button when logged out, user avatar
 * with dropdown when logged in.
 */
export function AuthButtons() {
  const { isSignedIn } = useAuth();

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
    <SignInButton mode="modal">
      <button className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-300 transition hover:border-cyan-500/60 hover:text-white">
        Entrar
      </button>
    </SignInButton>
  );
}
