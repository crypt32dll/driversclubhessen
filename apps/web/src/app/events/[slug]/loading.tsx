import { Container } from "@/components/ui/Container";

export default function EventDetailLoading() {
  return (
    <main>
      <Container>
        <p role="status" aria-live="polite">
          Event wird geladen…
        </p>
      </Container>
    </main>
  );
}
