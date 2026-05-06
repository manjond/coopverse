'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { login, register } from '@/app/actions/auth';

export function AuthForm({ mode, locale }: { mode: 'login' | 'register'; locale: string }) {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const lc = locale;
  const isLogin = mode === 'login';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = isLogin ? await login(formData) : await register(formData);
      if (result?.error) setError(result.error);
    });
  }

  const input = 'w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500 transition';
  const label = 'block text-xs uppercase tracking-wider text-zinc-400 mb-1';

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href={`/${lc}`} className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-2xl font-black text-zinc-950">
            C
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {isLogin
              ? (lc === 'es' ? 'Entra a Coopverse' : 'Sign in to Coopverse')
              : (lc === 'es' ? 'Crea tu cuenta' : 'Create your account')}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {isLogin
              ? (lc === 'es' ? 'Accede a tus favoritos desde cualquier dispositivo.' : 'Access your favorites from any device.')
              : (lc === 'es' ? 'Gratis. Guarda favoritos y valora juegos.' : 'Free. Save favorites and rate games.')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className={label}>{lc === 'es' ? 'Nombre' : 'Name'}</label>
              <input name="name" type="text" required minLength={2} maxLength={60}
                placeholder={lc === 'es' ? 'Tu nombre' : 'Your name'}
                className={input} />
            </div>
          )}

          <div>
            <label className={label}>Email</label>
            <input name="email" type="email" required
              placeholder="tu@email.com" className={input} />
          </div>

          <div>
            <label className={label}>{lc === 'es' ? 'Contraseña' : 'Password'}</label>
            <input name="password" type="password" required minLength={8}
              placeholder={lc === 'es' ? 'Mínimo 8 caracteres' : 'At least 8 characters'}
              className={input} />
          </div>

          {!isLogin && (
            <div>
              <label className={label}>{lc === 'es' ? 'Repite la contraseña' : 'Confirm password'}</label>
              <input name="password2" type="password" required minLength={8}
                placeholder={lc === 'es' ? 'Repite la contraseña' : 'Repeat password'}
                className={input} />
            </div>
          )}

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-fuchsia-500 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-fuchsia-400 disabled:opacity-60"
          >
            {isPending
              ? (lc === 'es' ? 'Cargando…' : 'Loading…')
              : isLogin
                ? (lc === 'es' ? 'Entrar' : 'Sign in')
                : (lc === 'es' ? 'Crear cuenta' : 'Create account')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          {isLogin
            ? (lc === 'es' ? '¿No tienes cuenta? ' : "Don't have an account? ")
            : (lc === 'es' ? '¿Ya tienes cuenta? ' : 'Already have an account? ')}
          <Link
            href={`/${lc}/${isLogin ? 'sign-up' : 'sign-in'}`}
            className="text-cyan-400 hover:text-cyan-300"
          >
            {isLogin
              ? (lc === 'es' ? 'Créala gratis' : 'Create it free')
              : (lc === 'es' ? 'Inicia sesión' : 'Sign in')}
          </Link>
        </p>
      </div>
    </main>
  );
}
