import type { NextConfig } from "next";

type RemotePattern = NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
>[number];

/**
 * Patterns for `next/image` when loading Strapi media.
 * Local `/uploads`, Strapi Cloud, self-hosted Strapi, and Cloudinary (`@strapi/provider-upload-cloudinary`).
 */
export function buildStrapiImageRemotePatterns(): RemotePattern[] {
  const patterns: RemotePattern[] = [
    {
      protocol: "http",
      hostname: "localhost",
      port: "1337",
      pathname: "/uploads/**",
    },
    {
      protocol: "http",
      hostname: "127.0.0.1",
      port: "1337",
      pathname: "/uploads/**",
    },
    {
      protocol: "https",
      hostname: "**.strapiapp.com",
      pathname: "/uploads/**",
    },
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/**",
    },
  ];

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!strapiUrl) {
    return patterns;
  }

  try {
    const parsed = new URL(strapiUrl);
    const hostname = parsed.hostname.toLowerCase();
    if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
      const protocol =
        parsed.protocol === "https:"
          ? "https"
          : parsed.protocol === "http:"
            ? "http"
            : "https";

      patterns.push({
        protocol,
        hostname,
        port: parsed.port || undefined,
        pathname: "/uploads/**",
      });
    }
  } catch {
    // Invalid URL at build time: keep dev-only patterns
  }

  return patterns;
}
