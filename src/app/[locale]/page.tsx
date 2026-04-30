import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { GameCard } from '@/components/GameCard';
import {
  getAllCategories,
  getFeaturedGames,
  getPopularGames,
  projectCategory,
  projectGame,
} from '@/db/queries';
import type { Locale } from '@/data/types';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  const [featuredRows, popularRows, categoryRows] = await Promise.all([
    getFeaturedGames(),
    getPopularGames(8),
    getAllCategories(),
  ]);
  const featured = featuredRows[0] ? projectGame(featuredRows[0]) : null;
  const popular = popularRows.map(projectGame);
  const allCategories = categoryRows.map(projectCategory);
  const lc = locale as Locale;

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800/50 px-6 py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(8,145,178,0.15),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(217,70,239,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <h1 className="bg-gradient-to-br from-cyan-300 via-fuchsia-300 to-amber-300 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-6xl">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            {t('heroSubtitle')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {featured && (
              <Link
                href={`/play/${featured.slug}`}
                className="rounded-lg bg-cyan-500 px-6 py-3 text-base font-semibold text-zinc-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
              >
                {t('ctaPlayNow')} →
              </Link>
            )}
            <Link
              href="/c/cooperativos"
              className="rounded-lg border border-zinc-700 px-6 py-3 text-base font-semibold text-zinc-100 transition hover:border-zinc-500"
            >
              {t('browseAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured spotlight */}
      {featured && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            {t('featuredGame')}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/30">
            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:gap-10 sm:p-10">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white sm:text-4xl">
                  {featured.title[lc]}
                </h3>
                <p className="mt-3 text-zinc-400">{featured.description[lc]}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/play/${featured.slug}`}
                    className="rounded-lg bg-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-fuchsia-400"
                  >
                    {t('ctaPlayNow')}
                  </Link>
                  <Link
                    href={`/g/${featured.slug}`}
                    className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500"
                  >
                    {t('browseAll')}
                  </Link>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-fuchsia-900 to-cyan-900">
                {/* Placeholder thumbnail — replace with real screenshot once we have one. */}
                <div className="grid h-full w-full place-items-center text-zinc-300">
                  <span className="text-4xl font-black tracking-tighter">
                    PIKO<span className="text-cyan-300">PARK</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          {t('categoriesTitle')}
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {allCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/c/${c.slug}`}
              className="group flex flex-col items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-5 text-center transition hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-zinc-900/70"
            >
              <span className="text-3xl">{c.icon}</span>
              <span className="text-sm font-semibold text-zinc-200 group-hover:text-white">
                {c.name[lc]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular grid */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-4 sm:px-6">
        <h2 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          {t('popular')}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {popular.map((g) => (
            <GameCard key={g.slug} game={g} locale={lc} />
          ))}
        </div>
      </section>
    </main>
  );
}
