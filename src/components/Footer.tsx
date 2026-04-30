import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

/**
 * Site footer. Houses legal links (privacy / terms — required by AdSense
 * and GDPR), copyright, and an inline brand reminder.
 */
export async function Footer() {
  const t = await getTranslations('Meta');

  return (
    <footer className="mt-auto border-t border-zinc-800/60 bg-zinc-950/60 py-8 text-sm text-zinc-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-semibold text-zinc-300">{t('siteName')}</span>{' '}
          · {t('tagline')}
        </div>
        <nav className="flex gap-5">
          <Link href="/privacy" className="hover:text-zinc-300">Privacy</Link>
          <Link href="/terms"   className="hover:text-zinc-300">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
