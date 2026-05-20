import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/data/types';
import { localeAlternates } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Terms',
    alternates: localeAlternates(locale, '/terms'),
  };
}

const COPY: Record<Locale, { lastUpdated: string; html: string }> = {
  es: {
    lastUpdated: '2026-05-20',
    html: `
      <h2>Aceptación de los términos</h2>
      <p>Al acceder a Coopverse aceptas estos términos. Si no estás de acuerdo, no uses el sitio.</p>

      <h2>Uso del servicio</h2>
      <p>Coopverse ofrece acceso gratuito a un catálogo de juegos de navegador, propios y de terceros. Te comprometes a no usar el sitio para fines ilícitos, no intentar vulnerar la seguridad ni hacer scraping masivo del catálogo.</p>

      <h2>Propiedad intelectual</h2>
      <p>El contenido propio (textos, marca Coopverse, juegos Wobble Park y Fighting Cats) es propiedad del operador. Los juegos servidos por terceros son propiedad de sus respectivos autores, estudios o distribuidores; Coopverse no reclama propiedad sobre esos juegos.</p>

      <h2>Juegos de terceros</h2>
      <p>Los juegos de terceros se muestran mediante enlaces, iframes o reproductores oficiales cuando el proveedor, distribuidor o titular permite esa forma de integración. No debes intentar extraer, copiar, modificar, revender, bloquear anuncios, ocultar marcas o eliminar avisos de copyright de esos juegos.</p>
      <p>Los proveedores externos pueden cambiar, retirar, bloquear o interrumpir sus juegos en cualquier momento. Si un juego deja de estar disponible, podremos retirarlo del catálogo.</p>

      <h2>Retirada de contenido</h2>
      <p>Si eres titular de derechos y crees que algún contenido de Coopverse infringe tus derechos o se ha integrado sin permiso suficiente, escríbenos a <a href="mailto:hola@coopverse.io">hola@coopverse.io</a> con la URL afectada, una descripción del derecho reclamado y una forma de contacto. Revisaremos la solicitud y, si procede, retiraremos o corregiremos el contenido.</p>

      <h2>Cuentas de usuario</h2>
      <p>Cuando activemos el registro, eres responsable de la confidencialidad de tu contraseña y de las actividades en tu cuenta. Podemos suspender cuentas que infrinjan estos términos.</p>

      <h2>Limitación de responsabilidad</h2>
      <p>Coopverse se ofrece "tal cual". No garantizamos disponibilidad continua ni que los juegos de terceros funcionen siempre. No somos responsables de daños derivados del uso del sitio.</p>

      <h2>Cambios</h2>
      <p>Podemos actualizar estos términos. Los cambios se publicarán en esta página.</p>

      <h2>Ley aplicable</h2>
      <p>Estos términos se rigen por la ley española. Cualquier disputa se someterá a los tribunales competentes en España.</p>

      <h2>Contacto</h2>
      <p>Para preguntas: <a href="mailto:hola@coopverse.io">hola@coopverse.io</a>.</p>
    `,
  },
  en: {
    lastUpdated: '2026-05-20',
    html: `
      <h2>Acceptance of terms</h2>
      <p>By accessing Coopverse you accept these terms. If you disagree, do not use the site.</p>

      <h2>Use of the service</h2>
      <p>Coopverse offers free access to a catalog of browser games, own and third-party. You agree not to use the site for unlawful purposes, not to attempt to breach security, and not to perform mass scraping of the catalog.</p>

      <h2>Intellectual property</h2>
      <p>Original content (text, the Coopverse brand, the Wobble Park and Fighting Cats games) is owned by the operator. Third-party games are owned by their respective authors, studios or distributors; Coopverse does not claim ownership of those games.</p>

      <h2>Third-party games</h2>
      <p>Third-party games are shown through links, iframes or official players when the provider, distributor or rights holder allows that integration method. You must not extract, copy, modify, resell, block ads, hide branding or remove copyright notices from those games.</p>
      <p>External providers may change, remove, block or interrupt their games at any time. If a game stops being available, we may remove it from the catalog.</p>

      <h2>Takedown requests</h2>
      <p>If you are a rights holder and believe any Coopverse content infringes your rights or has been integrated without sufficient permission, contact <a href="mailto:hola@coopverse.io">hola@coopverse.io</a> with the affected URL, a description of the claimed right, and a way to contact you. We will review the request and, where appropriate, remove or correct the content.</p>

      <h2>User accounts</h2>
      <p>When sign-up is enabled, you are responsible for the confidentiality of your password and activity on your account. Accounts violating these terms may be suspended.</p>

      <h2>Limitation of liability</h2>
      <p>Coopverse is provided "as is". Continuous availability is not guaranteed, nor that third-party games will always function. We are not liable for damages arising from use of the site.</p>

      <h2>Changes</h2>
      <p>These terms may be updated. Changes will be published on this page.</p>

      <h2>Governing law</h2>
      <p>Spanish law applies. Disputes are subject to Spain's competent courts.</p>

      <h2>Contact</h2>
      <p>Questions: <a href="mailto:hola@coopverse.io">hola@coopverse.io</a>.</p>
    `,
  },
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Legal');
  const c = COPY[locale as Locale];

  return (
    <main className="mx-auto max-w-3xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        {t('termsTitle')}
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        {t('lastUpdated')}: {c.lastUpdated}
      </p>
      <article
        className="prose prose-invert mt-8 max-w-none prose-headings:text-white prose-h2:mt-8 prose-h2:text-xl prose-p:text-zinc-300 prose-li:text-zinc-300 prose-a:text-cyan-400"
        dangerouslySetInnerHTML={{ __html: c.html }}
      />
    </main>
  );
}
