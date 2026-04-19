import type { MetadataRoute } from "next";

/**
 * **Keine Suchmaschinen-Indexierung** bis zum bewussten Go-Live.
 * `Disallow: /` blockiert das Crawling der gesamten Site (inkl. Marketing, Admin, API).
 *
 * Später für SEO: `allow`/`disallow` auf Marketing-Routen setzen, nur `/admin` und `/api`
 * sperren, und `sitemap` mit `getMarketingSiteOrigin()` ergänzen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/"],
    },
  };
}
