import { setRequestLocale } from 'next-intl/server';
import { AuthForm } from '@/components/AuthForm';

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AuthForm mode="register" locale={locale} />;
}
