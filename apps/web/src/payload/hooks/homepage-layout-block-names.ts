/**
 * Payload zeigt pro Layout-Block `blockName` in der Kopfzeile; leer = „Untitled“.
 * Hier sinnvolle deutsche Standardtitel, die Redakteure im CMS weiter anpassen können.
 */
const DEFAULT_BLOCK_NAMES: Record<string, string> = {
  hero: "Kopfbereich — Hero, Countdown, CTAs",
  ticker: "Ticker — Lauftext unter dem Hero",
  event: "Event — Infokarten & Teaser",
  features: "Highlights — Kacheln",
  rules: "Regeln — Verhalten vor Ort",
  about: "Über uns — Veranstalter",
  location: "Anfahrt — Karte & Infos",
  social: "Social — Links & Community",
};

/** Mutiert `doc.layout` und setzt `blockName`, wenn leer oder „Untitled“. */
export function ensureHomepageLayoutBlockNames(
  doc: Record<string, unknown> | null | undefined,
): void {
  if (!doc || typeof doc !== "object") return;
  const layout = doc.layout;
  if (!Array.isArray(layout)) return;
  for (const block of layout) {
    if (!block || typeof block !== "object") continue;
    const b = block as Record<string, unknown>;
    const blockType = b.blockType;
    if (typeof blockType !== "string") continue;
    const raw = b.blockName;
    const name = typeof raw === "string" ? raw.trim() : "";
    if (!name || name === "Untitled") {
      b.blockName = DEFAULT_BLOCK_NAMES[blockType] ?? blockType;
    }
  }
}
