import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { withPayload } from "@payloadcms/next/withPayload";

const require = createRequire(import.meta.url);
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Default ISR window (seconds); align with `CMS_ISR_REVALIDATE_SECONDS` in production env. */
const CMS_CACHE_REVALIDATE_SEC = 3600;

const isVercelBuild = process.env.VERCEL === "1";

/**
 * `next/image` remote hosts for Payload media (CDN) and same-origin API media.
 */
function buildPayloadImageRemotePatterns() {
  const patterns = [
    {
      protocol: "https",
      hostname: "**.public.blob.vercel-storage.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/**",
    },
  ];

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    process.env.VERCEL_URL;
  if (!appUrl) {
    return patterns;
  }

  try {
    const base = appUrl.startsWith("http") ? appUrl : `https://${appUrl}`;
    const parsed = new URL(base);
    patterns.push({
      protocol: parsed.protocol === "http:" ? "http" : "https",
      hostname: parsed.hostname,
      port: parsed.port || undefined,
      pathname: "/api/media/file/**",
    });
  } catch {
    /* ignore invalid URL at build time */
  }

  return patterns;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon" }];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  logging: isVercelBuild ? { fetches: { fullUrl: true } } : undefined,
  compiler: {
    runAfterProductionCompile: async ({ projectDir, distDir }) => {
      if (process.env.VERCEL !== "1" && process.env.CI !== "true") return;
      console.log(
        "[web:build] production compile finished — next: typecheck + static generation",
        JSON.stringify({ projectDir, distDir }),
      );
    },
  },
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
  cacheLife: {
    cms: {
      stale: 60,
      revalidate: CMS_CACHE_REVALIDATE_SEC,
      expire: 604800,
    },
  },
  staticPageGenerationTimeout: 180,
  turbopack: {
    root: path.join(process.cwd(), "../.."),
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve = webpackConfig.resolve ?? {};
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return webpackConfig;
  },
  images: {
    localPatterns: [{ pathname: "/api/media/file/**" }],
    remotePatterns: buildPayloadImageRemotePatterns(),
    formats: ["image/avif", "image/webp"],
  },
};

const withVanillaExtract = createVanillaExtractPlugin();

export default withPayload(withVanillaExtract(nextConfig), {
  devBundleServerPackages: false,
});
