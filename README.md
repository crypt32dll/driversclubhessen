# DriversClub Hessen Monorepo

Production-ready scaffold for the DriversClub Hessen platform:

- `apps/web`: Next.js 16 App Router frontend (React 19, TypeScript strict, vanilla-extract)
- `apps/cms`: Strapi v5 CMS (REST, SQLite by default)
- `packages/shared`: Shared Zod schemas and shared content types

## Tech Decisions

- Frontend: Next.js + React (latest stable), Server Components by default
- Styling: `vanilla-extract` (zero-runtime CSS, recommended for modern Next.js)
- API layer: Typed REST services with Zod validation
- Formatting/linting: Biome
- CMS: Strapi v5 with content types for Event, Homepage, Gallery
- GDPR baseline: Cookie consent banner (opt-in), Impressum, Datenschutzerklaerung

## Project Structure

```text
apps/
  web/
    src/
      app/
      components/
      hooks/
      lib/
      styles/
  cms/
    src/
      api/
      components/
packages/
  shared/
```

## Local Setup

Prerequisites:

- Node.js LTS (recommended: Node 20 or Node 22)
- npm

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev:web
```

Run CMS:

```bash
npm run dev:cms
```

## Build and Quality Checks

Format:

```bash
npm run format
```

Lint:

```bash
npm run lint
```

Shared typecheck:

```bash
npm run typecheck
```

Build web:

```bash
npm run build --workspace web
```

Build CMS:

```bash
npm run build --workspace cms
```

## Environment

Frontend reads Strapi URL from `NEXT_PUBLIC_STRAPI_URL` (code falls back to `http://localhost:1337` when unset).

Templates (commit these; copy for real secrets):

- [apps/web/.env.local.example](apps/web/.env.local.example) — copy to `apps/web/.env.local` for local dev
- [apps/web/.env.production.example](apps/web/.env.production.example) — paste into Vercel → Environment Variables → Production

`next/image` allows Strapi media hosts via `remotePatterns` in [apps/web/next.config.ts](apps/web/next.config.ts): localhost/127.0.0.1, `**.strapiapp.com`, and the hostname of `NEXT_PUBLIC_STRAPI_URL`, all scoped to `/uploads/**`.

## Notes

- The frontend build currently skips Next.js build-time type validation due a Node 23 environment-specific TypeScript hang. Use Node LTS in CI and run dedicated typecheck there.
- Replace legal placeholder texts in `Impressum` and `Datenschutzerklaerung` with legally reviewed content before launch.