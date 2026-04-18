#!/usr/bin/env npx tsx
/**
 * Seeds Payload globals: `homepage.layout` (block layout aligned with `defaultHomepageLayoutView`),
 * legal pages (Lexical rich text placeholders), and cookie-banner copy.
 *
 * Loads `.env.development.local` then `.env.local` from `apps/web` (same pattern as `verify-neon-connection.mjs`).
 * Run from repo root: `npm run seed:cms --workspace web`
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  type HomepageLayoutBlockView,
  defaultHomepageLayoutView,
} from "@driversclub/shared";
import { getPayload } from "payload";

import type { Homepage } from "../src/payload-types";
import config from "../src/payload.config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");

function loadEnvFile(name: string) {
  const path = join(webRoot, name);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (!key) continue;
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] == null || process.env[key] === "") {
      process.env[key] = val;
    }
  }
}

loadEnvFile(".env.development.local");
loadEnvFile(".env.local");

/** Minimal Lexical editor state for Payload richText fields. */
function lexicalFromParagraphs(lines: string[]) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: lines.map((text) => ({
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        textFormat: 0,
        textStyle: "",
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text,
            version: 1,
          },
        ],
      })),
    },
  };
}

function viewBlocksToHomepagePayload(
  blocks: HomepageLayoutBlockView[],
): NonNullable<Homepage["layout"]> {
  const out: NonNullable<Homepage["layout"]> = [];
  for (const b of blocks) {
    switch (b.blockType) {
      case "ticker":
        out.push({
          blockType: "ticker",
          items: b.items.map((text) => ({ text })),
        });
        break;
      case "social":
        out.push({
          blockType: "social",
          sectionLabel: b.sectionLabel,
          titleLead: b.titleLead,
          titleAccent: b.titleAccent,
          intro: b.intro,
          links: (b.links ?? []).map((l) => ({
            label: l.label,
            url: l.href,
            openInNewTab: l.newTab ?? true,
          })),
        });
        break;
      default:
        out.push(b as NonNullable<Homepage["layout"]>[number]);
        break;
    }
  }
  return out;
}

async function main() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.error(
      "Missing DATABASE_URL (or POSTGRES_URL). Load env from apps/web/.env.local first.",
    );
    process.exit(1);
  }
  if (!process.env.PAYLOAD_SECRET) {
    console.error("Missing PAYLOAD_SECRET.");
    process.exit(1);
  }

  const payload = await getPayload({ config });

  const layout = viewBlocksToHomepagePayload(defaultHomepageLayoutView.blocks);

  await payload.updateGlobal({
    slug: "homepage",
    data: { layout },
  });
  console.log("Updated global: homepage (layout blocks).");

  await payload.updateGlobal({
    slug: "cookie-banner",
    data: {
      message:
        "Wir verwenden nur technisch notwendige Cookies. Optionale Cookies werden erst nach deiner Einwilligung aktiviert.",
      acceptLabel: "Alle akzeptieren",
      rejectLabel: "Nur notwendige",
    },
  });
  console.log("Updated global: cookie-banner.");

  await payload.updateGlobal({
    slug: "legal-impressum",
    data: {
      title: "Impressum",
      body: lexicalFromParagraphs([
        "Angaben gemaess Abschnitt 5 TMG. Bitte die folgenden Platzhalter durch die tatsaechlichen Vereins-/Betreiberdaten ersetzen.",
        "DriversClub Hessen",
        "Strasse und Hausnummer",
        "PLZ Ort, Deutschland",
        "E-Mail: kontakt@example.com",
      ]) as unknown as Record<string, unknown>,
    },
  });
  console.log("Updated global: legal-impressum.");

  await payload.updateGlobal({
    slug: "legal-datenschutz",
    data: {
      title: "Datenschutz",
      body: lexicalFromParagraphs([
        "Hier erscheint die Datenschutzerklaerung. Bitte Inhalt im Payload-Global Datenschutz pflegen.",
      ]) as unknown as Record<string, unknown>,
    },
  });
  console.log("Updated global: legal-datenschutz.");

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
