import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// next-intl plugin — wires up the request config in src/i18n/request.ts.
// Without this, server components can't read the active locale.
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Cloudflare Pages compatibility: emit standalone output.
  // (Removed for now — re-enable when we configure CF Pages Workers if needed.)
};

export default withNextIntl(nextConfig);
