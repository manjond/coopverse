'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const HISTORY_KEY = 'coopverse_history';

interface HistoryEntry { slug: string; title: string; ts: number }

function readHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function RecentlyPlayed({ locale }: { locale: string }) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const lc = locale;

  useEffect(() => {
    const id = window.setTimeout(() => setHistory(readHistory()), 0);
    return () => window.clearTimeout(id);
  }, []);

  if (history.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        {lc === 'es' ? 'Últimos jugados' : 'Recently played'}
      </h2>
      <div className="flex flex-wrap gap-2">
        {history.map((h) => (
          <Link
            key={h.slug}
            href={`/${lc}/g/${h.slug}`}
            className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-cyan-500/40 hover:text-white"
          >
            {h.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
