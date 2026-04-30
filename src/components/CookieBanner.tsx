'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';

const STORAGE_KEY = 'coopverse_cookie_consent_v1';

/**
 * Bare-bones GDPR / ePrivacy cookie banner. Stores the user's choice in
 * localStorage so it doesn't pop again. We don't load any analytics or
 * ad scripts before the user accepts — that compliance flow gets wired
 * in once we add AdSense (Step 23).
 *
 * For a stricter IAB TCF v2 banner we'd swap this for Cookiebot or a
 * headless library; for an MVP this is enough to be GDPR-defensible.
 */
export function CookieBanner({
  acceptLabel,
  rejectLabel,
  message,
  privacyLabel,
}: {
  acceptLabel: string;
  rejectLabel: string;
  message: string;
  privacyLabel: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
  }, []);

  if (!open) return null;

  const close = (choice: 'accepted' | 'rejected') => {
    localStorage.setItem(STORAGE_KEY, choice);
    setOpen(false);
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:right-4 sm:max-w-md">
      <div className="rounded-xl border border-zinc-700 bg-zinc-900/95 p-4 shadow-2xl backdrop-blur">
        <p className="text-sm text-zinc-300">{message}</p>
        <p className="mt-2 text-xs text-zinc-500">
          <Link href="/privacy" className="underline hover:text-zinc-300">
            {privacyLabel}
          </Link>
        </p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => close('rejected')}
            className="flex-1 rounded-md border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-zinc-500"
          >
            {rejectLabel}
          </button>
          <button
            onClick={() => close('accepted')}
            className="flex-1 rounded-md bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-zinc-950 transition hover:bg-cyan-400"
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
