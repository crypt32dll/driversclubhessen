import { Container } from "@/components/ui/Container";

export default function EventDetailLoading() {
  return (
    <main>
      <Container>
        <output aria-live="polite" style={{ display: "block" }}>
          Event wird geladen…
        </output>
      </Container>
    </main>
  );
}
