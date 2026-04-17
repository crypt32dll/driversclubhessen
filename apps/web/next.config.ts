import path from "node:path";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

import { buildStrapiImageRemotePatterns } from "./src/lib/strapi/build-remote-patterns";

/** Default ISR window (seconds); align with `STRAPI_ISR_REVALIDATE_SECONDS` in production env. */
const STRAPI_CACHE_REVALIDATE_SEC = 3600;

const nextConfig: NextConfig = {
  typescript: {
    // Node 23 in this environment can hang TS build checks.
    // Keep CI on Node LTS and run `npm run typecheck` in CI.
    ignoreBuildErrors: true,
  },
  // Monorepo: trace files from repo root (avoids wrong root when multiple lockfiles exist).
  // Assumes Next commands run with cwd = `apps/web` (default for npm workspace scripts).
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
  /**
   * Next.js 16 cache profiles for `revalidateTag(tag, 'strapi')` (optional; webhook code uses `'max'`).
   * Keeps Data Cache semantics aligned with route `revalidate` + Strapi `fetch(..., { next: { revalidate } })`.
   */
  cacheLife: {
    strapi: {
      stale: 60,
      revalidate: STRAPI_CACHE_REVALIDATE_SEC,
      expire: 604800,
    },
  },
  /** Prerender can wait on Strapi during `next build` / Vercel (slow CMS or cold start). */
  staticPageGenerationTimeout: 180,
  images: {
    remotePatterns: buildStrapiImageRemotePatterns(),
    formats: ["image/avif", "image/webp"],
  },
};

const withVanillaExtract = createVanillaExtractPlugin();

export default withVanillaExtract(nextConfig);
