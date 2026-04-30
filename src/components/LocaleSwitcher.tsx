'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/**
 * Client switcher between locales. Re-uses the current pathname so the
 * user lands on the equivalent page in the other language. Bare-bones
 * `<select>` for first iteration — replaceable by a styled menu later.
 */
export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      value={locale}
      onChange={(e) => {
        router.replace(pathname, { locale: e.target.value });
      }}
      className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs uppercase tracking-wider text-zinc-300 hover:border-zinc-500"
      aria-label="Language selector"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
}
