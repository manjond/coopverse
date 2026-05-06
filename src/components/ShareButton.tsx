'use client';

import { useState } from 'react';

export function ShareButton({ title, locale }: { title: string; locale: string }) {
  const [copied, setCopied] = useState(false);
  const lc = locale;

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-zinc-500 hover:text-white"
    >
      {copied ? '✓ ' : '↗ '}
      {copied
        ? (lc === 'es' ? 'Copiado' : 'Copied')
        : (lc === 'es' ? 'Compartir' : 'Share')}
    </button>
  );
}
