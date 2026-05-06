import Link from 'next/link';
import { neon } from '@neondatabase/serverless';
import { db } from '@/db/client';
import { games, categories, favorites, ratings } from '@/db/schema';
import { desc, sql, count } from 'drizzle-orm';

export default async function AdminDashboard() {
  const rawSql = neon(process.env.DATABASE_URL!);

  const [
    allGames,
    allCats,
    topPlayed,
    topFavorited,
    topRated,
    userStats,
    recentUsers,
    totalFavorites,
    totalRatings,
  ] = await Promise.all([
    db.select().from(games),
    db.select().from(categories),

    // Top 5 most played
    db.select({ slug: games.slug, titleEs: games.titleEs, playsCount: games.playsCount })
      .from(games).orderBy(desc(games.playsCount)).limit(5),

    // Top 5 most favorited
    rawSql`
      SELECT g.slug, g.title_es, COUNT(f.id)::int AS fav_count
      FROM games g LEFT JOIN favorites f ON f.game_slug = g.slug
      GROUP BY g.slug, g.title_es ORDER BY fav_count DESC LIMIT 5
    `,

    // Top 5 highest rated
    rawSql`
      SELECT g.slug, g.title_es, ROUND(AVG(r.stars)::numeric, 1) AS avg_stars, COUNT(r.id)::int AS vote_count
      FROM games g LEFT JOIN ratings r ON r.game_slug = g.slug
      GROUP BY g.slug, g.title_es HAVING COUNT(r.id) > 0
      ORDER BY avg_stars DESC LIMIT 5
    `,

    // User stats
    rawSql`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days')::int AS last_7d,
        COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days')::int AS last_30d
      FROM users
    `,

    // 10 most recent signups
    rawSql`SELECT name, email, created_at FROM users ORDER BY created_at DESC LIMIT 10`,

    // Total favorites
    rawSql`SELECT COUNT(*)::int AS n FROM favorites`,

    // Total ratings
    rawSql`SELECT COUNT(*)::int AS n FROM ratings`,
  ]);

  const featuredCount   = allGames.filter((g) => g.featured).length;
  const ownCount        = allGames.filter((g) => g.source === 'own').length;
  const placeholderCount = allGames.filter((g) => g.embedUrl === 'about:blank').length;
  const totalPlays      = allGames.reduce((s, g) => s + g.playsCount, 0);
  const users           = userStats[0] as { total: number; last_7d: number; last_30d: number };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">Analytics en tiempo real de la plataforma.</p>
      </div>

      {/* ── Usuarios ── */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Usuarios</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Total usuarios"   value={users?.total ?? 0}    accent="good" />
          <Stat label="Nuevos (7 días)"  value={users?.last_7d ?? 0} />
          <Stat label="Nuevos (30 días)" value={users?.last_30d ?? 0} />
          <Stat label="Favoritos totales" value={(totalFavorites[0] as any)?.n ?? 0} />
        </div>

        {recentUsers.length > 0 && (
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/60 text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {recentUsers.map((u: any) => (
                  <tr key={u.email} className="hover:bg-zinc-900/40">
                    <td className="px-4 py-2 text-zinc-200">{u.name}</td>
                    <td className="px-4 py-2 text-zinc-400">{u.email}</td>
                    <td className="px-4 py-2 text-zinc-500 text-xs">
                      {new Date(u.created_at).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Catálogo ── */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Catálogo</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Juegos" value={allGames.length} />
          <Stat label="Categorías" value={allCats.length} />
          <Stat label="Partidas totales" value={totalPlays} />
          <Stat label="Valoraciones" value={(totalRatings[0] as any)?.n ?? 0} />
        </div>
      </section>

      {/* ── Rankings ── */}
      <div className="grid gap-6 sm:grid-cols-3">
        <RankList title="🎮 Más jugados" items={topPlayed.map((g) => ({ name: g.titleEs, value: `${g.playsCount} partidas`, slug: g.slug }))} />
        <RankList title="♥ Más guardados" items={(topFavorited as any[]).map((g) => ({ name: g.title_es, value: `${g.fav_count} favs`, slug: g.slug }))} />
        <RankList title="★ Mejor valorados" items={(topRated as any[]).map((g) => ({ name: g.title_es, value: `${g.avg_stars}★ (${g.vote_count})`, slug: g.slug }))} />
      </div>

      {placeholderCount > 0 && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 text-sm text-amber-300">
          {placeholderCount} juego{placeholderCount !== 1 ? 's' : ''} placeholder — reemplaza con juegos reales.
        </div>
      )}

      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Acciones rápidas</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/admin/games/new" className={cardCls}>+ Nuevo juego</Link>
          <Link href="/admin/games"     className={cardCls}>Gestionar juegos</Link>
          <Link href="/admin/categories" className={cardCls}>Categorías</Link>
        </div>
      </div>
    </div>
  );
}

const cardCls =
  'rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-5 text-sm font-semibold text-zinc-200 transition hover:border-cyan-500/40 hover:bg-zinc-900/70';

function Stat({ label, value, accent }: { label: string; value: number; accent?: 'good' | 'warn' }) {
  const color = accent === 'good' ? 'text-emerald-400' : accent === 'warn' ? 'text-amber-400' : 'text-white';
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className={`text-3xl font-bold ${color}`}>{value.toLocaleString()}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">{label}</div>
    </div>
  );
}

function RankList({ title, items }: { title: string; items: { name: string; value: string; slug: string }[] }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <h3 className="mb-3 font-semibold text-zinc-200">{title}</h3>
      {items.length === 0 ? (
        <p className="text-xs text-zinc-600">Sin datos aún.</p>
      ) : (
        <ol className="space-y-2">
          {items.map((item, i) => (
            <li key={item.slug} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2 min-w-0">
                <span className="text-xs text-zinc-600 w-4">{i + 1}.</span>
                <Link href={`/admin/games/${item.slug}`} className="text-zinc-300 hover:text-white truncate">
                  {item.name}
                </Link>
              </span>
              <span className="text-xs text-zinc-500 shrink-0">{item.value}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
