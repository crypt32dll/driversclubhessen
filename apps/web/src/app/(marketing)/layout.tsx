import { CookieBanner } from "@/components/gdpr/CookieBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import { SITE_METADATA_DEFAULTS } from "@/lib/metadata/marketing-page-metadata";
import { gdprService } from "@/lib/services/gdpr";
import { navigationService } from "@/lib/services/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Orbitron, Rajdhani } from "next/font/google";
import { Suspense, cache } from "react";
import "@/styles/global.css";

const getMarketingNavigation = cache(() =>
  navigationService.getSiteNavigation(),
);

async function MarketingSiteNav() {
  const { items } = await getMarketingNavigation();
  return <SiteNav items={items} />;
}

async function MarketingSiteFooterAndCookie() {
  const [{ items }, cfg] = await Promise.all([
    getMarketingNavigation(),
    gdprService.getCookieBanner(),
  ]);
  return (
    <>
      <SiteFooter primaryLinks={items} />
      <CookieBanner
        message={cfg.message}
        acceptLabel={cfg.acceptLabel}
        rejectLabel={cfg.rejectLabel}
      />
    </>
  );
}

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  /** 400: UI copy on accent; 900: hero countdown numerals — drops unused 700 file. */
  weight: ["400", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function siteMetadataBase(): URL {
  const raw =
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
  if (raw) {
    try {
      const normalized = raw.startsWith("http") ? raw : `https://${raw}`;
      return new URL(normalized);
    } catch {
      /* fall through */
    }
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: siteMetadataBase(),
  title: SITE_METADATA_DEFAULTS.title,
  description: SITE_METADATA_DEFAULTS.description,
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
  },
};

/** Pinned tab / browser UI tint; matches `tokens.css` color.black */
export const viewport: Viewport = {
  themeColor: "#06060a",
};

/**
 * Marketing site root layout (own `<html>` / `<body>`).
 * Kept separate from `(payload)` so Payload admin is not nested inside this document — avoids
 * invalid `<html>` inside `<body>` and hydration errors. See Next.js “multiple root layouts”.
 */
export default function MarketingRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${bebasNeue.variable} ${orbitron.variable} ${rajdhani.variable}`}
    >
      <body>
        <Suspense fallback={null}>
          <MarketingSiteNav />
        </Suspense>
        {children}
        <Suspense fallback={null}>
          <MarketingSiteFooterAndCookie />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
