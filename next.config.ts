import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
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
  // Security headers served by Vercel (replaces public/_headers which is Cloudflare-only)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',  value: 'nosniff' },
          { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
          { key: 'X-DNS-Prefetch-Control',   value: 'on' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Strict-Transport-Security',value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy',  value: "frame-ancestors 'self'" },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag',    value: 'noindex, nofollow' },
          { key: 'Cache-Control',   value: 'no-store, no-cache, must-revalidate' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
