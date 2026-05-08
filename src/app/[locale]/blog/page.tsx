import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getPostsByLocale } from '@/content/blog/registry';
import type { Locale } from '@/data/types';
import { localeAlternates } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lc = locale as Locale;
  const alternates = localeAlternates(locale, '/blog');
  return lc === 'es'
    ? {
        title: 'Blog — Guías y artículos sobre juegos cooperativos',
        description:
          'Guías, listas y artículos sobre los mejores juegos cooperativos y multijugador de navegador en español.',
        alternates,
      }
    : {
        title: 'Blog — Co-op & multiplayer game guides',
        description:
          'Guides, lists and articles about the best co-op and multiplayer browser games.',
        alternates,
      };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lc = locale as Locale;
  const posts = getPostsByLocale(locale);

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        {lc === 'es' ? 'Blog' : 'Blog'}
      </h1>
      <p className="mt-2 text-zinc-400">
        {lc === 'es'
          ? 'Guías, listas y artículos sobre juegos cooperativos y multijugador.'
          : 'Guides, lists and articles about co-op and multiplayer games.'}
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-zinc-500">
          {lc === 'es' ? 'Próximamente…' : 'Coming soon…'}
        </p>
      ) : (
        <ul className="mt-10 space-y-6">
          {posts.map(({ meta }) => (
            <li key={meta.slug}>
              <Link
                href={`/blog/${meta.slug}`}
                className="group block rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-cyan-500/40"
              >
                <time className="text-xs text-zinc-500">{meta.publishedAt}</time>
                <h2 className="mt-1 text-xl font-semibold text-zinc-100 group-hover:text-white">
                  {meta.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                  {meta.description}
                </p>
                <p className="mt-3 text-xs text-zinc-500">
                  {meta.readingTimeMin} min {lc === 'es' ? 'de lectura' : 'read'}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
