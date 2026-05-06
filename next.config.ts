import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Pages doesn't run the Next.js image optimization server.
    // Serve images as-is; Cloudflare's CDN handles caching.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'imgs.crazygames.com' },
      { protocol: 'https', hostname: 'images.crazygames.com' },
      { protocol: 'https', hostname: '**.gamedistribution.com' },
      { protocol: 'https', hostname: '**.itch.zone' },
      { protocol: 'https', hostname: 'ev.io' },
      { protocol: 'https', hostname: 'sketchful.io' },
      { protocol: 'https', hostname: 'www.shellshock.io' },
      { protocol: 'https', hostname: 'wormate.io' },
      { protocol: 'https', hostname: 'surviv.io' },
    ],
  },
};

export default withNextIntl(nextConfig);

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
