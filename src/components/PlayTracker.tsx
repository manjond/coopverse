'use client';

import { useEffect, useRef } from 'react';
import { incrementPlayCount } from '@/app/actions/play';

const HISTORY_KEY = 'coopverse_history';
const MAX_HISTORY = 10;

export function PlayTracker({ slug, title }: { slug: string; title: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    // Increment server-side play count
    incrementPlayCount(slug).catch(() => {});

    // Save to local history
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const history: { slug: string; title: string; ts: number }[] = raw ? JSON.parse(raw) : [];
      const filtered = history.filter((h) => h.slug !== slug);
      filtered.unshift({ slug, title, ts: Date.now() });
      localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered.slice(0, MAX_HISTORY)));
    } catch {}
  }, [slug, title]);

  return null;
}
