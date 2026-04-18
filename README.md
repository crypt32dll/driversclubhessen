# DriversClub Hessen Monorepo

Production-ready scaffold for the DriversClub Hessen platform:

- `apps/web`: Next.js 16 App Router app (React 19, TypeScript strict, vanilla-extract) with **Payload CMS 3** embedded (admin + REST/GraphQL), Postgres, and optional Vercel Blob for uploads
- `packages/shared`: Shared Zod schemas and shared content types

## Tech Decisions

- Frontend: Next.js + React (latest stable), Server Components by default
- Styling: `vanilla-extract` (zero-runtime CSS, recommended for modern Next.js)
- CMS: Payload 3 in-process (`getPayload`), collections `events`, `galleries`, `media`, global `homepage`
- Data validation: Zod (`packages/shared`) at service boundaries
- Formatting/linting: Biome
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
    next.config.mjs
    src/payload.config.ts
packages/
  shared/
```

## Local Setup

Prerequisites:

- Node.js LTS (recommended: Node 20 or Node 22)
- npm
- Postgres (local Docker, Neon, or similar) for Payload

Install dependencies:

```bash
npm install
```

Run the web app (Next + Payload admin at `/admin`):

```bash
npm run dev:web
```

Copy [apps/web/.env.local.example](apps/web/.env.local.example) to `apps/web/.env.local` and set `DATABASE_URL`, `PAYLOAD_SECRET`, and `NEXT_PUBLIC_APP_URL`.

After `vercel env pull .env.development.local` in `apps/web`, run **`npm run neon:check --workspace web`** to confirm Neon’s serverless driver can reach your database.

If you see a **node `pg` SSL warning** about `sslmode=require` vs future libpq behavior, use **`sslmode=verify-full`** in `DATABASE_URL` for Neon, or rely on the small normalizer in [`apps/web/src/lib/postgres-url.ts`](apps/web/src/lib/postgres-url.ts) (Neon hosts only).

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

## Environment

**Database:** Use [Neon Postgres via the Vercel Marketplace](https://vercel.com/marketplace/neon) so `DATABASE_URL` is wired for deploys; for local dev, paste the same Neon connection string (or a dev branch) into `apps/web/.env.local`.

Also set `PAYLOAD_SECRET`, `NEXT_PUBLIC_APP_URL`, optional `BLOB_READ_WRITE_TOKEN`, and `REVALIDATE_SECRET` for `/api/revalidate`. See [apps/web/.env.production.example](apps/web/.env.production.example).

`next/image` allows Payload media via `localPatterns` (`/api/media/file/**`) and remote patterns for Vercel Blob (`**.public.blob.vercel-storage.com`) and Cloudinary in [apps/web/next.config.mjs](apps/web/next.config.mjs).

## Notes

- The frontend build may skip Next.js build-time type validation in some environments; run `npm run typecheck --workspace web` in CI.
- Replace legal placeholder texts in `Impressum` and `Datenschutzerklaerung` with legally reviewed content before launch.
