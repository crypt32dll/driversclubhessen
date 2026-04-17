import { Container } from "@/components/ui/Container";
import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <main>
      <Container>
        <h1>Datenschutzerklaerung</h1>
        <p>
          Diese Seite ist ein DSGVO-konformer Platzhalter. Ersetze die Inhalte
          durch eine rechtlich gepruefte Fassung fuer DriversClub Hessen.
        </p>
        <h2>1. Verantwortliche Stelle</h2>
        <p>DriversClub Hessen, Adresse, Kontakt-E-Mail</p>
        <h2>2. Hosting und technische Logs</h2>
        <p>
          Das Frontend wird auf Vercel betrieben. Es werden nur technisch
          erforderliche Daten verarbeitet.
        </p>
        <h2>3. Cookies</h2>
        <p>
          Nicht-essentielle Cookies werden erst nach Einwilligung gesetzt.
          Details im Cookie-Banner.
        </p>
        <p>
          Siehe auch <Link href="/legal/impressum">Impressum</Link>.
        </p>
      </Container>
    </main>
  );
}
