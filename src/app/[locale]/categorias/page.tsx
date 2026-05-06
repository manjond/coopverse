import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllCategories, getAllGames, projectCategory } from '@/db/queries';
import type { Locale } from '@/data/types';

export const revalidate = 3600;

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return params.locale === 'es'
    ? { title: 'Categorías de juegos', description: 'Explora todas las categorías de juegos cooperativos y multijugador en Coopverse.' }
    : { title: 'Game categories', description: 'Explore all co-op and multiplayer game categories on Coopverse.' };
}

export default async function CategoriasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lc = locale as Locale;

  const [catRows, gameRows] = await Promise.all([getAllCategories(), getAllGames()]);
  const categories = catRows.map(projectCategory);

  // Count games per category
  const countMap = new Map<string, number>();
  for (const g of gameRows) {
    for (const slug of g.categorySlugs) {
      countMap.set(slug, (countMap.get(slug) ?? 0) + 1);
    }
  }

  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        {lc === 'es' ? 'Categorías' : 'Categories'}
      </h1>
      <p className="mt-2 text-zinc-400">
        {lc === 'es'
          ? 'Encuentra juegos por tipo — cooperativos, disparos, física, party y más.'
          : 'Find games by type — co-op, shooters, physics, party and more.'}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = countMap.get(c.slug) ?? 0;
          return (
            <Link
              key={c.slug}
              href={`/c/${c.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:-translate-y-0.5 hover:border-fuchsia-500/40 hover:bg-zinc-900/70"
            >
              <span className="text-4xl">{c.icon}</span>
              <div className="flex-1">
                <h2 className="font-semibold text-zinc-100 group-hover:text-white">
                  {c.name[lc]}
                </h2>
                <p className="mt-0.5 text-sm text-zinc-500 line-clamp-2">
                  {c.description[lc]}
                </p>
                <p className="mt-2 text-xs text-zinc-600">
                  {count} {lc === 'es' ? `juego${count !== 1 ? 's' : ''}` : `game${count !== 1 ? 's' : ''}`}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
