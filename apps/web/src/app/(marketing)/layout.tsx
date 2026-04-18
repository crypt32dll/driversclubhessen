import { CookieBannerGate } from "@/components/gdpr/CookieBannerGate";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import { navigationService } from "@/lib/services/navigation";
import type { Metadata } from "next";
import { Bebas_Neue, Orbitron, Rajdhani } from "next/font/google";
import { Suspense } from "react";
import "@/styles/global.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DriversClub Hessen",
  description: "DriversClub Hessen - Tuning Treffen Community Plattform",
  /** Pinned tab / browser UI tint; matches `tokens.css` color.black */
  themeColor: "#06060a",
};

/**
 * Marketing site root layout (own `<html>` / `<body>`).
 * Kept separate from `(payload)` so Payload admin is not nested inside this document — avoids
 * invalid `<html>` inside `<body>` and hydration errors. See Next.js “multiple root layouts”.
 */
export default async function MarketingRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { items } = await navigationService.getSiteNavigation();

  return (
    <html
      lang="de"
      className={`${bebasNeue.variable} ${orbitron.variable} ${rajdhani.variable}`}
    >
      <body>
        <SiteNav items={items} />
        {children}
        <SiteFooter primaryLinks={items} />
        <Suspense fallback={null}>
          <CookieBannerGate />
        </Suspense>
      </body>
    </html>
  );
}
