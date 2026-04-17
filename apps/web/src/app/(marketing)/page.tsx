import { HeroSection } from "@/components/sections/HeroSection";
import { MarketingSections } from "@/components/sections/MarketingSections";
import { Ticker } from "@/components/sections/Ticker";
import { UpcomingEventsSection } from "@/components/sections/UpcomingEventsSection";
import { marketingHome } from "@/styles/global.css";
import { Suspense } from "react";

export default function MarketingPage() {
  return (
    <main className={marketingHome}>
      <HeroSection />
      <Ticker />
      <Suspense fallback={<p>Lade Events...</p>}>
        <UpcomingEventsSection />
      </Suspense>
      <MarketingSections />
    </main>
  );
}
