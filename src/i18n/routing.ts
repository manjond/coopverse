import { defineRouting } from 'next-intl/routing';

/**
 * Locale routing config — Spanish as the default and primary locale,
 * English in waiting. URLs use `/es/...` and `/en/...` subdirectories.
 *
 * Why Spanish-default: launch market is Spain + Latam where SEO is
 * achievable. English content gets activated once ES traction is proven
 * (see PORTAL_PLAN.md §3 multilingual strategy).
 */
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // 'always' forces every URL to carry a locale prefix → cleaner SEO
  // (no duplicate-content between `/` and `/es/`).
  localePrefix: 'always',
});
