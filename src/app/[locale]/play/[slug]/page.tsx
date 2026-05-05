import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllGames, getGameBySlug, projectGame } from '@/db/queries';
import { PlayTracker } from '@/components/PlayTracker';
import type { Locale } from '@/data/types';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  const all = await getAllGames();
  return routing.locales.flatMap((locale) =>
    all.map((g) => ({ locale, slug: g.slug })),
  );
}

export const metadata = {
  // Don't index the play view — Google should rank /g/[slug] (the
  // marketing-friendly one), not the headless iframe view.
  robots: { index: false, follow: false },
};

export default async function PlayPage({
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
  const tPlay = await getTranslations('Play');

  return (
    <div className="flex flex-1 flex-col bg-zinc-950">
      <PlayTracker slug={game.slug} />
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 text-sm">
        <Link
          href={`/g/${game.slug}`}
          className="rounded-md border border-zinc-700 px-3 py-1 text-xs text-zinc-300 transition hover:border-zinc-500"
        >
          ← {tPlay('backToCatalog')}
        </Link>
        <span className="font-semibold text-zinc-200">{game.title[lc]}</span>
        <a
          href={game.embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-zinc-700 px-3 py-1 text-xs text-zinc-300 transition hover:border-zinc-500"
        >
          {tPlay('openInNewTab')} ↗
        </a>
      </div>

      <div className="flex-1 bg-black">
        <iframe
          src={game.embedUrl}
          title={game.title[lc]}
          className="h-[calc(100vh-100px)] w-full border-0"
          allow="fullscreen; autoplay; gamepad; pointer-lock; microphone; clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}
