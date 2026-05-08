import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { AdSenseScript } from '@/components/AdSenseScript';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { getSiteUrl, SEO_LOCALES } from '@/lib/site';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return {
    title: { default: t('siteName'), template: `%s · ${t('siteName')}` },
    description: t('description'),
    metadataBase: new URL(getSiteUrl()),
    robots: SEO_LOCALES.includes(locale as (typeof SEO_LOCALES)[number])
      ? undefined
      : { index: false, follow: true },
    icons: {
      icon: '/icon.svg',
      apple: '/apple-icon.svg',
    },
    manifest: '/manifest.json',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const tCookies = await getTranslations('Cookies');

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <AdSenseScript />
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <NextIntlClientProvider>
          <Header locale={locale} />
          {children}
          <Footer />
          <CookieBanner
            message={tCookies('message')}
            acceptLabel={tCookies('accept')}
            rejectLabel={tCookies('reject')}
            privacyLabel={tCookies('privacyLink')}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
