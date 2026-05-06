import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { AdSenseScript } from '@/components/AdSenseScript';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

// publishableKey is hardcoded so it's always embedded at build time regardless
// of how Cloudflare Pages exposes env vars during the build step.
const CLERK_PK = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ?? 'pk_test_aGVyb2ljLW1hc3RpZmYtMzYuY2xlcmsuYWNjb3VudHMuZGV2JA';

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
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://coopverse.io',
    ),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
    },
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
    <ClerkProvider
      publishableKey={CLERK_PK}
      signInUrl={`/${locale}/sign-in`}
      signUpUrl={`/${locale}/sign-up`}
    >
      <html
        lang={locale}
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <AdSenseScript />
        <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
          <NextIntlClientProvider>
            <Header />
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
    </ClerkProvider>
  );
}
