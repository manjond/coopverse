import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getPostBySlug, getAllSlugsForLocale } from '@/content/blog/registry';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/data/types';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllSlugsForLocale(locale).map((slug) => ({ locale, slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const post = getPostBySlug(params.locale, params.slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: `/${params.locale}/blog/${params.slug}`,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const { meta, Content } = post;
  const lc = locale as Locale;

  // Schema.org Article markup for Google rich results
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Coopverse',
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://coopverse.io',
    },
  };

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300"
      >
        ← {lc === 'es' ? 'Volver al blog' : 'Back to blog'}
      </Link>

      <article>
        <header className="mb-8 border-b border-zinc-800 pb-8">
          <div className="mb-3 flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            {meta.title}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-zinc-500">
            <time>{meta.publishedAt}</time>
            <span>·</span>
            <span>{meta.readingTimeMin} min {lc === 'es' ? 'de lectura' : 'read'}</span>
          </div>
        </header>

        <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-white prose-a:text-cyan-400 prose-strong:text-zinc-100">
          <Content />
        </div>
      </article>
    </main>
  );
}
