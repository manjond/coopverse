'use client';

import { useEffect, useRef } from 'react';
import { incrementPlayCount } from '@/app/actions/play';

/**
 * Fires a single play-count increment when the play page mounts.
 * useRef guards against double-fire in React strict mode.
 */
export function PlayTracker({ slug }: { slug: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    incrementPlayCount(slug).catch(() => {/* non-critical, ignore */});
  }, [slug]);

  return null;
}
