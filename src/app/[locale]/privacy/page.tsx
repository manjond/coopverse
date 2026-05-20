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
    title: 'Privacy',
    alternates: localeAlternates(locale, '/privacy'),
  };
}

const COPY: Record<Locale, { lastUpdated: string; html: string }> = {
  es: {
    lastUpdated: '2026-05-20',
    html: `
      <h2>Quiénes somos</h2>
      <p>Coopverse es un portal de juegos cooperativos y multijugador en navegador operado por un particular en España. Para contacto: <a href="mailto:hola@coopverse.io">hola@coopverse.io</a>.</p>

      <h2>Qué datos recogemos</h2>
      <p>Cuando navegas por Coopverse podemos recoger:</p>
      <ul>
        <li><strong>Datos técnicos</strong>: dirección IP, tipo de navegador, sistema operativo, páginas visitadas, tiempos de visita. Sirven para entender el uso del portal y mejorar el rendimiento.</li>
        <li><strong>Datos que tú nos proporcionas</strong>: si te registras (próximamente), guardamos tu correo, nombre de usuario y juegos favoritos.</li>
        <li><strong>Cookies y tecnologías similares</strong>: para recordar tus preferencias y mostrar anuncios relevantes solo si los aceptas.</li>
      </ul>

      <h2>Para qué los usamos</h2>
      <ul>
        <li>Operar el portal y mostrarte juegos.</li>
        <li>Mejorar el catálogo, identificar problemas técnicos y producir estadísticas anónimas.</li>
        <li>Enviarte comunicaciones que tú hayas solicitado.</li>
        <li>Mostrar anuncios mediante Google AdSense u otras redes publicitarias si aceptas cookies publicitarias.</li>
      </ul>

      <h2>Cookies</h2>
      <p>Usamos cookies esenciales (recordar tu idioma, sesión) y cookies de terceros para publicidad. La publicidad no se carga hasta que aceptas. Puedes borrar las cookies desde tu navegador.</p>

      <h2>Tus derechos (RGPD)</h2>
      <p>Puedes pedir acceder, rectificar o borrar tus datos escribiendo a <a href="mailto:hola@coopverse.io">hola@coopverse.io</a>. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).</p>

      <h2>Terceros</h2>
      <p>Algunos juegos del catálogo se sirven mediante iframes, enlaces o reproductores de terceros (por ejemplo CrazyGames, GameDistribution, GamePix, Gamezop, Famobi, itch.io u operadores directos de juegos). Al abrir un juego de terceros, ese proveedor puede recibir datos técnicos como dirección IP, navegador, dispositivo, URL de referencia, identificadores publicitarios o estadísticas de juego, según sus propias políticas.</p>
      <p>No controlamos directamente las prácticas de esos terceros. Si no quieres que un proveedor externo reciba esos datos, no abras ese juego o usa el enlace a su política antes de jugar cuando esté disponible.</p>

      <h2>Cambios</h2>
      <p>Esta política puede actualizarse. La fecha "Última actualización" indicará la última revisión.</p>
    `,
  },
  en: {
    lastUpdated: '2026-05-20',
    html: `
      <h2>Who we are</h2>
      <p>Coopverse is a portal of co-op and multiplayer browser games operated by an individual based in Spain. Contact: <a href="mailto:hola@coopverse.io">hola@coopverse.io</a>.</p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Technical data</strong>: IP address, browser type, operating system, pages visited, visit timing. Used to understand portal usage and improve performance.</li>
        <li><strong>Data you provide</strong>: if you sign up (coming soon), we store your email, username and favorite games.</li>
        <li><strong>Cookies and similar tech</strong>: to remember your preferences and show relevant ads only if you accept them.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>Operate the portal and show you games.</li>
        <li>Improve the catalog, identify issues, produce anonymous stats.</li>
        <li>Send communications you've requested.</li>
        <li>Show ads via Google AdSense or similar networks if you accept advertising cookies.</li>
      </ul>

      <h2>Cookies</h2>
      <p>We use essential cookies (remember your locale, session) and third-party cookies for advertising. Advertising does not load until you accept. You can clear cookies from your browser.</p>

      <h2>Your rights (GDPR)</h2>
      <p>You can request access, rectification or deletion of your data by writing to <a href="mailto:hola@coopverse.io">hola@coopverse.io</a>. You can also lodge a complaint with the Spanish Data Protection Agency (AEPD).</p>

      <h2>Third parties</h2>
      <p>Some games are served via third-party iframes, links or official players (for example CrazyGames, GameDistribution, GamePix, Gamezop, Famobi, itch.io or direct game operators). When you open a third-party game, that provider may receive technical data such as IP address, browser, device, referrer URL, advertising identifiers or gameplay stats, according to its own policies.</p>
      <p>We do not directly control those third-party practices. If you do not want an external provider to receive that data, do not open that game or check the provider's policy before playing when available.</p>

      <h2>Changes</h2>
      <p>This policy may be updated. The "Last updated" date indicates the latest revision.</p>
    `,
  },
};

export default async function PrivacyPage({
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
        {t('privacyTitle')}
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
