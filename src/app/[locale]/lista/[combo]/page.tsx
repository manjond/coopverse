import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { GameCard } from '@/components/GameCard';
import { COMBOS, comboBySlug } from '@/data/combos';
import { getGamesByCategoryAndPlayers, projectGame } from '@/db/queries';
import type { Locale } from '@/data/types';
import { routing } from '@/i18n/routing';

/**
 * Programmatic SEO pages — /[locale]/lista/[combo].
 *
 * Generates pages for each category × player-count combination.
 * Example: /es/lista/cooperativos-2-jugadores targets the keyword
 * "juegos cooperativos para 2 jugadores" which has decent search
 * volume and almost no direct competition in Spanish.
 *
 * Each page:
 * - Has a unique title/description/h1 in both locales (real copy, not
 *   machine-translated — see src/data/combos.ts)
 * - Includes schema.org ItemList markup for rich results
 * - Links back to the canonical category page + individual game pages
 * - Is hreflang-linked to its equivalent in the other locale
 */

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    COMBOS.map((c) => ({ locale, combo: c.slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; combo: string };
}): Metadata {
  const combo = comboBySlug(params.combo);
  if (!combo) return {};
  const lc = params.locale as Locale;
  return {
    title: combo.title[lc],
    description: combo.description[lc],
    alternates: {
      canonical: `/${params.locale}/lista/${combo.slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/lista/${combo.slug}`]),
      ),
    },
  };
}

export default async function ComboPage({
  params,
}: {
  params: Promise<{ locale: string; combo: string }>;
}) {
  const { locale, combo: comboSlug } = await params;
  setRequestLocale(locale);
  const combo = comboBySlug(comboSlug);
  if (!combo) notFound();

  const lc = locale as Locale;
  const rows = await getGamesByCategoryAndPlayers(combo.categorySlug, combo.maxPlayers);
  const games = rows.map(projectGame);

  const playerLabel = { es: `${combo.maxPlayers} jugador${combo.maxPlayers > 1 ? 'es' : ''}`, en: `${combo.maxPlayers} player${combo.maxPlayers > 1 ? 's' : ''}` };
  const catLabel = { es: combo.categorySlug.replace(/-/g, ' '), en: combo.categorySlug.replace(/-/g, ' ') };

  // Schema.org ItemList — boosts rich-result eligibility for list pages.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: combo.title[lc],
    description: combo.description[lc],
    numberOfItems: games.length,
    itemListElement: games.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.title[lc],
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://coopverse.io'}/${locale}/g/${g.slug}`,
    })),
  };

  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="mb-8 border-b border-zinc-800 pb-6">
        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
          <Link href={`/c/${combo.categorySlug}`} className="hover:text-zinc-300">
            {catLabel[lc]}
          </Link>
          <span>→</span>
          <span>{playerLabel[lc]}</span>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          {combo.h1[lc]}
        </h1>
        <p className="mt-2 text-zinc-400">{combo.description[lc]}</p>
      </header>

      {games.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-500">
          {lc === 'es'
            ? 'Aún no hay juegos en esta combinación. Vuelve pronto.'
            : 'No games in this combination yet. Check back soon.'}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {games.map((g) => (
            <GameCard key={g.slug} game={g} locale={lc} />
          ))}
        </div>
      )}

      <div className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="text-lg font-bold text-white">
          {lc === 'es' ? 'Explora más categorías' : 'Explore more categories'}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {COMBOS.filter((c) => c.slug !== comboSlug).slice(0, 8).map((c) => (
            <Link
              key={c.slug}
              href={`/lista/${c.slug}`}
              className="rounded-md border border-zinc-700 px-3 py-1 text-sm text-zinc-300 transition hover:border-cyan-500/40 hover:text-white"
            >
              {c.h1[lc]}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
