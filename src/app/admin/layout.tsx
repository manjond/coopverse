import Link from 'next/link';
import { isAdmin } from '@/lib/admin-auth';
import { LoginForm } from './LoginForm';
import { logout } from './actions';

/**
 * Admin layout. Sits OUTSIDE the [locale] segment — admin is operator-
 * only and isn't translated. Wraps every /admin/* page; renders the
 * login form whenever the cookie is invalid.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdmin();

  if (!authed) {
    return (
      <html lang="en">
        <body className="grid min-h-screen place-items-center bg-zinc-950 text-zinc-100">
          <LoginForm />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        <header className="border-b border-zinc-800 bg-zinc-900/40">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <div className="flex items-center gap-6">
              <span className="font-bold tracking-tight">
                coop<span className="text-fuchsia-400">verse</span>{' '}
                <span className="ml-2 rounded-md bg-amber-400/20 px-2 py-0.5 text-xs uppercase tracking-wider text-amber-300">
                  admin
                </span>
              </span>
              <nav className="flex gap-4 text-sm text-zinc-400">
                <Link href="/admin"            className="hover:text-white">Dashboard</Link>
                <Link href="/admin/games"      className="hover:text-white">Games</Link>
                <Link href="/admin/games/new"  className="hover:text-white">+ New game</Link>
                <Link href="/admin/categories" className="hover:text-white">Categories</Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300">
                ← back to site
              </Link>
              <form action={logout}>
                <button className="rounded-md border border-zinc-700 px-3 py-1 text-xs text-zinc-300 transition hover:border-zinc-500">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
