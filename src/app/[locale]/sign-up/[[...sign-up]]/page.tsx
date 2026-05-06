import { SignUp } from '@clerk/nextjs';
import { setRequestLocale } from 'next-intl/server';

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-2xl font-black text-zinc-950">
            C
          </div>
          <h1 className="text-2xl font-bold text-white">
            {locale === 'es' ? 'Únete a Coopverse' : 'Join Coopverse'}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {locale === 'es'
              ? 'Crea tu cuenta gratis — guarda favoritos y organiza tus juegos'
              : 'Create your free account — save favorites and organize your games'}
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-zinc-900 border border-zinc-800 shadow-xl rounded-2xl',
              headerTitle: 'text-white',
              headerSubtitle: 'text-zinc-400',
              socialButtonsBlockButton: 'border-zinc-700 text-zinc-200 hover:bg-zinc-800',
              dividerLine: 'bg-zinc-700',
              dividerText: 'text-zinc-500',
              formFieldLabel: 'text-zinc-300',
              formFieldInput: 'bg-zinc-950 border-zinc-700 text-white focus:border-cyan-500',
              formButtonPrimary: 'bg-fuchsia-500 hover:bg-fuchsia-400 text-zinc-950 font-semibold',
              footerActionLink: 'text-cyan-400 hover:text-cyan-300',
            },
          }}
        />
      </div>
    </main>
  );
}
