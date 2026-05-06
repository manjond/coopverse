import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';
import { AuthButtons } from './AuthButtons';

// Server component — no getSession() here so pages stay statically rendered.
// AuthButtons reads the cv_display cookie client-side after hydration.
export async function Header({ locale }: { locale: string }) {
  const t = await getTranslations('Nav');

  const links = [
    { href: '/juegos',     label: t('allGames') },
    { href: '/categorias', label: t('categories') },
    { href: '/blog',       label: t('blog') },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800/60 bg-zinc-950/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-base font-black text-zinc-950">
            C
          </span>
          <span className="text-lg font-bold tracking-tight">
            coop<span className="text-fuchsia-400">verse</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <AuthButtons locale={locale} />
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
