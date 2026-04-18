import { Container } from "@/components/ui/Container";
import { marketingHome } from "@/styles/global.css";

/** Instant shell while the marketing route’s RSC payload streams (separate from per-chunk fallbacks). */
export default function MarketingLoading() {
  return (
    <main className={marketingHome}>
      <Container>
        <output aria-live="polite" style={{ display: "block" }}>
          Startseite wird geladen…
        </output>
      </Container>
    </main>
  );
}
