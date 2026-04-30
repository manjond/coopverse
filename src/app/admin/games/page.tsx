import Link from 'next/link';
import { db } from '@/db/client';
import { games } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { deleteGame } from '../actions';

export default async function GamesAdminList() {
  const all = await db
    .select()
    .from(games)
    .orderBy(desc(games.featured), desc(games.publishedAt));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Games ({all.length})</h1>
        <Link
          href="/admin/games/new"
          className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-cyan-400"
        >
          + New game
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900/60 text-xs uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-3 py-2 text-left">Slug</th>
              <th className="px-3 py-2 text-left">Title (ES)</th>
              <th className="px-3 py-2 text-left">Source</th>
              <th className="px-3 py-2 text-left">Players</th>
              <th className="px-3 py-2 text-left">Featured</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {all.map((g) => (
              <tr key={g.slug} className="hover:bg-zinc-900/40">
                <td className="px-3 py-2 font-mono text-xs text-zinc-400">{g.slug}</td>
                <td className="px-3 py-2 text-zinc-200">{g.titleEs}</td>
                <td className="px-3 py-2 text-zinc-400">{g.source}</td>
                <td className="px-3 py-2 text-zinc-400">
                  {g.minPlayers === g.maxPlayers
                    ? g.minPlayers
                    : `${g.minPlayers}–${g.maxPlayers}`}
                </td>
                <td className="px-3 py-2">
                  {g.featured ? (
                    <span className="rounded bg-amber-400/20 px-2 py-0.5 text-xs text-amber-300">
                      ★
                    </span>
                  ) : (
                    <span className="text-zinc-700">—</span>
                  )}
                </td>
                <td className="px-3 py-2 text-right">
                  <Link
                    href={`/admin/games/${g.slug}`}
                    className="mr-3 text-cyan-400 hover:text-cyan-300"
                  >
                    Edit
                  </Link>
                  <form
                    action={deleteGame.bind(null, g.slug)}
                    className="inline"
                  >
                    <button
                      className="text-rose-400 hover:text-rose-300"
                      type="submit"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
