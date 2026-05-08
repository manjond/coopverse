# Coopverse

Multilingual portal of cooperative & multiplayer browser games. Spanish-first, English-ready.

🌐 https://www.coopverse.io (live once deployed)

## Stack

- **Next.js 15** App Router + TypeScript + TailwindCSS
- **next-intl** for i18n (Spanish primary, English in waiting)
- **Cloudflare Pages** hosting + CDN + DNS
- **Neon** Postgres database (catalog, users, favorites)
- **Clerk** auth (added later)
- **GameDistribution** for the third-party catalog (added later)

Strategy doc: see `PORTAL_PLAN.md` in the sibling `pikopark-online` repo.

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
      g/[slug]/      # (planned) game detail
      c/[slug]/      # (planned) category
      play/[slug]/   # (planned) iframe play view
  i18n/
    routing.ts       # locale list + default
    request.ts       # per-request config (lazy-loads messages)
    navigation.ts    # locale-aware Link / redirect / etc.
  middleware.ts      # locale detection on every request
messages/
  es.json            # Spanish translations (primary)
  en.json            # English translations
```

## Deploy

- Push to `main` → Cloudflare Pages auto-builds + deploys (configured in Step 13).
- Production env vars set via Cloudflare Pages dashboard → Settings → Environment variables.

## License

Proprietary — all rights reserved (for now).
