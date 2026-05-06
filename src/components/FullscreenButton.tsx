'use client';

import { useState } from 'react';

export function FullscreenButton({
  targetId,
  locale,
}: {
  targetId: string;
  locale: string;
}) {
  const [isFs, setIsFs] = useState(false);
  const lc = locale;

  function toggle() {
    const el = document.getElementById(targetId);
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFs(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFs(false)).catch(() => {});
    }
  }

  return (
    <button
      onClick={toggle}
      className="rounded-md border border-zinc-700 px-3 py-1 text-xs text-zinc-300 transition hover:border-zinc-500 hover:text-white"
      title={isFs ? (lc === 'es' ? 'Salir de pantalla completa' : 'Exit fullscreen') : (lc === 'es' ? 'Pantalla completa' : 'Fullscreen')}
    >
      {isFs ? '⛶' : '⛶'} {isFs ? (lc === 'es' ? 'Salir' : 'Exit') : (lc === 'es' ? 'Pantalla completa' : 'Fullscreen')}
    </button>
  );
}
