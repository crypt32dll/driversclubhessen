import { CookieBanner } from "@/components/gdpr/CookieBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import type { Metadata } from "next";
import { Bebas_Neue, Orbitron, Rajdhani } from "next/font/google";
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
};

export default function RootLayout({
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
        <SiteNav />
        {children}
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
