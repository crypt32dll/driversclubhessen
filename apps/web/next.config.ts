import path from "node:path";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

import { buildStrapiImageRemotePatterns } from "./src/lib/strapi/build-remote-patterns";

const nextConfig: NextConfig = {
  typescript: {
    // Node 23 in this environment can hang TS build checks.
    // Keep CI on Node LTS and run `npm run typecheck` in CI.
    ignoreBuildErrors: true,
  },
  // Monorepo: trace files from repo root (avoids wrong root when multiple lockfiles exist).
  // Assumes Next commands run with cwd = `apps/web` (default for npm workspace scripts).
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
  images: {
    remotePatterns: buildStrapiImageRemotePatterns(),
    formats: ["image/avif", "image/webp"],
  },
};

const withVanillaExtract = createVanillaExtractPlugin();

export default withVanillaExtract(nextConfig);
