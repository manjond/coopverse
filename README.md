# Coopverse

Spanish-first portal of cooperative and multiplayer browser games.

🌐 https://www.coopverse.io

## Stack

- **Next.js 16** App Router + TypeScript + Tailwind CSS
- **next-intl** for locale-aware routes (`/es` primary, `/en` available but noindexed)
- **Vercel / OpenNext Cloudflare-compatible** deployment scripts
- **Neon** Postgres database (catalog, users, favorites)
- Password-based first-party accounts for favorites and ratings
- Third-party browser games embedded in isolated iframes

Strategy doc: see `PORTAL_PLAN.md`.

## Local dev

```bash
npm install
cp .env.example .env.local      # then fill in real values
npm run dev                     # http://localhost:3000/es
```

Hot-reload at `http://localhost:3000/es` and `http://localhost:3000/en`. The bare `/` redirects to `/es` (default locale).

## Project structure

```
src/
  app/
    [locale]/        # all routes scoped to a locale
      layout.tsx
      page.tsx       # homepage
      g/[slug]/      # game detail
      c/[slug]/      # category page
      play/[slug]/   # noindex iframe play view
  i18n/
    routing.ts       # locale list + default
    request.ts       # per-request config (lazy-loads messages)
    navigation.ts    # locale-aware Link / redirect / etc.
  proxy.ts           # locale detection on every request
messages/
  es.json            # Spanish translations (primary)
  en.json            # English translations
```

## Security notes

- Keep `AUTH_SECRET`, `ADMIN_PASSWORD`, and `DATABASE_URL` out of git.
- Production `AUTH_SECRET` must be a random value with at least 32 characters.
- `/admin` and `/api` are blocked in robots; `/[locale]/play/*` returns noindex metadata so Google ranks `/g/[slug]` instead.
- Third-party games are loaded in sandboxed iframes; add new embeds through the admin form so URL validation and source labeling run.
- New third-party games must come from an official embed/API, a publisher agreement, or written permission. Keep notes in `docs/game-sourcing-policy.md`.

## Deploy

- Push to `main` to trigger the configured production deployment.
- Production env vars are set in the hosting provider dashboard.

## License

Proprietary — all rights reserved (for now).
