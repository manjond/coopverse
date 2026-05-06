'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { logout } from '@/app/actions/auth';

function readDisplayCookie(): string | null {
  try {
    const match = document.cookie.split(';').find((c) => c.trim().startsWith('cv_display='));
    if (!match) return null;
    const val = decodeURIComponent(match.split('=').slice(1).join('='));
    return JSON.parse(val)?.name ?? null;
  } catch {
    return null;
  }
}

export function AuthButtons({ locale }: { locale: string }) {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    setName(readDisplayCookie());
  }, []);

  if (name) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href={`/${locale}/perfil`}
          className="h-8 w-8 grid place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-sm font-bold text-zinc-950"
          title={name}
        >
          {name[0].toUpperCase()}
        </Link>
        <form action={logout}>
          <button className="text-xs text-zinc-500 hover:text-zinc-300 transition">
            {locale === 'es' ? 'Salir' : 'Out'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <Link
      href={`/${locale}/sign-in`}
      className="rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-1.5 text-sm font-semibold text-white transition hover:border-cyan-500 hover:bg-zinc-700"
    >
      Entrar
    </Link>
  );
}
