'use client';

import { useFormStatus } from 'react-dom';
import { login } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-cyan-500 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400 disabled:opacity-50"
    >
      {pending ? '…' : 'Entrar'}
    </button>
  );
}

export function LoginForm() {
  return (
    <form
      action={login}
      className="w-80 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl"
    >
      <h1 className="text-xl font-bold text-white">Coopverse admin</h1>
      <p className="mt-1 text-xs text-zinc-500">Acceso privado para gestionar el catálogo.</p>

      <label className="mt-5 block text-xs uppercase tracking-wider text-zinc-400">
        Contraseña
      </label>
      <input
        type="password"
        name="password"
        required
        autoFocus
        autoComplete="current-password"
        className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-cyan-500"
      />

      <div className="mt-5">
        <SubmitButton />
      </div>
    </form>
  );
}
