import { Container } from "@/components/ui/Container";
import { marketingHome } from "@/styles/global.css";

/** Instant shell while the marketing route’s RSC payload streams (separate from per-chunk fallbacks). */
export default function MarketingLoading() {
  return (
    <main className={marketingHome}>
      <Container>
        <p role="status" aria-live="polite">
          Startseite wird geladen…
        </p>
      </Container>
    </main>
  );
}
