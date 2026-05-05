import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { GameCard } from '@/components/GameCard';
import {
  getAllGames,
  getCategoryBySlug,
  getGameBySlug,
  getRelatedGames,
  projectCategory,
  projectGame,
} from '@/db/queries';
import { AdSlot } from '@/components/AdSlot';
import type { Locale } from '@/data/types';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  const all = await getAllGames();
  return routing.locales.flatMap((locale) =>
    all.map((g) => ({ locale, slug: g.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const row = await getGameBySlug(slug);
  if (!row) return {};
  const game = projectGame(row);
  const lc = locale as Locale;
  return {
    title: game.title[lc],
    description: game.tagline[lc],
    openGraph: {
      title: game.title[lc],
      description: game.tagline[lc],
      images: [game.thumbUrl],
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/g/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/g/${slug}`]),
      ),
    },
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const row = await getGameBySlug(slug);
  if (!row) notFound();
  const game = projectGame(row);
  const lc = locale as Locale;
  const tGame = await getTranslations('Game');
  const tHome = await getTranslations('Home');

  // Pull related from the first matching category, exclude self.
  const related = game.categories[0]
    ? (await getRelatedGames(game.slug, game.categories[0], 4)).map(projectGame)
    : [];

  // Resolve category names for the chip row in a single batch.
  const categoryRows = await Promise.all(
    game.categories.map((s) => getCategoryBySlug(s)),
  );
  const categoryByCSlug = new Map(
    categoryRows.filter((c): c is NonNullable<typeof c> => Boolean(c)).map((c) => [c.slug, projectCategory(c)]),
  );

  // Schema.org VideoGame markup — boosts rich-result eligibility on Google.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title[lc],
    description: game.description[lc],
    inLanguage: lc,
    image: game.thumbUrl,
    numberOfPlayers: {
      '@type': 'QuantitativeValue',
      minValue: game.minPlayers,
      maxValue: game.maxPlayers,
    },
    gamePlatform: 'Web browser',
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    datePublished: game.publishedAt,
  };

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {game.title[lc]}
          </h1>
          <p className="mt-3 text-lg text-zinc-400">{game.tagline[lc]}</p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-300">
            <span className="rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1">
              {tGame('playersRange')}{' '}
              {game.minPlayers === game.maxPlayers
                ? game.minPlayers
                : `${game.minPlayers}–${game.maxPlayers}`}
            </span>
            {game.categories.map((cs) => {
              const c = categoryByCSlug.get(cs);
              return c ? (
                <Link
                  key={cs}
                  href={`/c/${cs}`}
                  className="rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1 transition hover:border-fuchsia-500/40 hover:text-white"
                >
                  {c.icon} {c.name[lc]}
                </Link>
              ) : null;
            })}
          </div>
        </div>

        <Link
          href={`/play/${game.slug}`}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 px-8 py-4 text-lg font-bold text-zinc-950 shadow-lg shadow-cyan-500/20 transition hover:from-cyan-300 hover:to-fuchsia-400"
        >
          ▶ {tHome('ctaPlayNow')}
        </Link>
      </header>

      <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          {tGame('description')}
        </h2>
        <p className="mt-3 whitespace-pre-line text-zinc-300">
          {game.description[lc]}
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          {tGame('howToPlay')}
        </h2>
        <p className="mt-3 whitespace-pre-line text-zinc-300">
          {game.instructions[lc]}
        </p>
      </section>

      {/* Ad slot — activates automatically when NEXT_PUBLIC_ADSENSE_PUB_ID is set */}
      <AdSlot slot="3291847562" format="horizontal" className="mt-10" />

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            {tGame('relatedTitle')}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((g) => (
              <GameCard key={g.slug} game={g} locale={lc} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
