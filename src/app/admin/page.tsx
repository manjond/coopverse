import Link from 'next/link';
import { db } from '@/db/client';
import { games, categories } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Dashboard summary. Reads counts straight from the DB so the operator
 * sees catalog health at a glance.
 */
export default async function AdminDashboard() {
  const [allGames, allCats] = await Promise.all([
    db.select().from(games),
    db.select().from(categories),
  ]);
  const featuredCount = allGames.filter((g) => g.featured).length;
  const ownCount = allGames.filter((g) => g.source === 'own').length;
  const placeholderCount = allGames.filter((g) => g.embedUrl === 'about:blank').length;

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Catalog health overview. Add games via the sidebar.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Games"        value={allGames.length} />
        <Stat label="Categories"   value={allCats.length} />
        <Stat label="Featured"     value={featuredCount} />
        <Stat label="Own (PikoPark+)" value={ownCount} accent={ownCount > 0 ? 'good' : 'warn'} />
      </div>

      {placeholderCount > 0 && (
        <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 text-sm text-amber-300">
          {placeholderCount} placeholder game{placeholderCount === 1 ? '' : 's'} in catalog —
          replace with real entries before public launch (and before applying for AdSense).
        </div>
      )}

      <h2 className="mt-10 text-sm font-medium uppercase tracking-wider text-zinc-500">
        Quick actions
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Link href="/admin/games/new" className={cardCls}>+ New game</Link>
        <Link href="/admin/games"     className={cardCls}>Manage games</Link>
        <Link href="/admin/categories" className={cardCls}>Manage categories</Link>
      </div>
    </div>
  );
}

const cardCls =
  'rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-5 text-sm font-semibold text-zinc-200 transition hover:border-cyan-500/40 hover:bg-zinc-900/70';

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: 'good' | 'warn';
}) {
  const color =
    accent === 'good' ? 'text-emerald-400' : accent === 'warn' ? 'text-amber-400' : 'text-white';
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">{label}</div>
    </div>
  );
}
