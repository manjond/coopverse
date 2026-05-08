import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

const DEFAULT_SITE_URL = 'https://www.coopverse.io';
export const SEO_LOCALES = ['es'] as const;

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL).replace(/\/+$/, '');
}

export function absoluteUrl(path = '') {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path ? `/${path.replace(/^\/+/, '')}` : '';
  return `${getSiteUrl()}${normalizedPath}`;
}

export function localizedPath(locale: string, path = '') {
  const normalizedPath = path ? `/${path.replace(/^\/+/, '')}` : '';
  return `/${locale}${normalizedPath}`;
}

export function localeAlternates(locale: string, path = ''): Metadata['alternates'] {
  return {
    canonical: localizedPath(locale, path),
    languages: Object.fromEntries([
      ...SEO_LOCALES.map((l) => [l, localizedPath(l, path)]),
      ['x-default', localizedPath(routing.defaultLocale, path)],
    ]),
  };
}

export function localeAlternateUrls(path = '', locales: readonly string[] = SEO_LOCALES) {
  return Object.fromEntries([
    ...locales.map((locale) => [locale, absoluteUrl(localizedPath(locale, path))]),
    ['x-default', absoluteUrl(localizedPath(routing.defaultLocale, path))],
  ]);
}
