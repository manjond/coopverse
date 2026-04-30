import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { GameCard } from '@/components/GameCard';
import { CATEGORIES, categoryBySlug } from '@/data/categories';
import { gamesByCategory } from '@/data/games';
import type { Locale } from '@/data/types';
import { routing } from '@/i18n/routing';

/**
 * Pre-render every (locale × category) combination at build time. With
 * 2 locales × N categories the matrix is small — fine for static
 * generation. When the catalog grows beyond 100 categories revisit.
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CATEGORIES.map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) return {};
  const lc = locale as Locale;
  return {
    title: cat.name[lc],
    description: cat.description[lc],
    alternates: {
      canonical: `/${locale}/c/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/c/${slug}`]),
      ),
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const cat = categoryBySlug(slug);
  if (!cat) notFound();
  const lc = locale as Locale;
  const games = gamesByCategory(slug);
  const tCat = await getTranslations('Category');

  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <header className="mb-8 flex items-center gap-4 border-b border-zinc-800 pb-6">
        <span className="text-5xl">{cat.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {cat.name[lc]}
          </h1>
          <p className="mt-1 text-zinc-400">{cat.description[lc]}</p>
        </div>
      </header>

      {games.length === 0 ? (
        <p className="text-zinc-500">{tCat('noGames')}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {games.map((g) => (
            <GameCard key={g.slug} game={g} locale={lc} />
          ))}
        </div>
      )}
    </main>
  );
}
