import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,70,239,0.08),transparent_60%)]" />

      <span className="relative text-8xl font-black text-zinc-800 sm:text-9xl">404</span>

      <h1 className="relative mt-4 text-2xl font-bold text-white sm:text-3xl">
        Página no encontrada
      </h1>
      <p className="relative mt-3 max-w-md text-zinc-400">
        Este juego o página no existe. Puede que haya sido movido o que la URL esté mal escrita.
      </p>

      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-fuchsia-400"
        >
          Volver al inicio
        </Link>
        <Link
          href="/c/cooperativos"
          className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500"
        >
          Ver juegos cooperativos
        </Link>
      </div>
    </main>
  );
}
