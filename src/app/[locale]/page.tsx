import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

/**
 * Homepage. Server-rendered, fully static — best SEO posture. Translation
 * keys live in `messages/{locale}.json`. Once the catalog API is wired
 * (Step 11), this page will pull the featured game + popular grid from
 * the database; for now it renders a hero + placeholder for PikoPark.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');
  const tNav = await getTranslations('Nav');

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800/50 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="bg-gradient-to-br from-cyan-300 via-fuchsia-300 to-amber-300 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-6xl">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            {t('heroSubtitle')}
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/g/pikopark"
              className="rounded-lg bg-cyan-500 px-6 py-3 text-base font-semibold text-zinc-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
            >
              {t('ctaPlayNow')} →
            </Link>
            <Link
              href="/c/cooperativos"
              className="rounded-lg border border-zinc-700 px-6 py-3 text-base font-semibold text-zinc-100 transition hover:border-zinc-500"
            >
              {tNav('categories')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured placeholder */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-zinc-500">
          {t('featuredGame')}
        </h2>
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 sm:p-12">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold text-white">PikoPark Online</h3>
              <p className="mt-3 text-zinc-400">
                Cooperative platformer puzzles for 1 to 8 players. Browser, no
                downloads. (Featured launch title.)
              </p>
              <Link
                href="/g/pikopark"
                className="mt-6 inline-block rounded-lg bg-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-fuchsia-400"
              >
                {t('ctaPlayNow')}
              </Link>
            </div>
            <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-900 to-cyan-900 text-zinc-300">
              <span className="text-sm">PikoPark thumbnail</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
