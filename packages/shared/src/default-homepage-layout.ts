import { homepageLayoutViewSchema } from "./homepage-layout";
import type { HomepageLayoutView } from "./homepage-layout";

const DEFAULT_COLLAB_BODY =
  "Zwei Communities. Eine Leidenschaft. Der DriversClub Hessen wurde 2024 gegründet und steht für die Leidenschaft für Autos in Hessen. Gemeinsam mit Mi Familia & Friends bringen wir die Szene zusammen – für ein Treffen, das Erinnerungen hinterlässt.";

/**
 * Mirrors the former marketing homepage defaults when the CMS `homepage.layout` is empty.
 * Used as a runtime fallback and as the reference for `npm run seed:cms` in `apps/web`.
 */
export const defaultHomepageLayoutView: HomepageLayoutView =
  homepageLayoutViewSchema.parse({
    blocks: [
      {
        blockType: "hero",
        eyebrow: "Mi Familia & Friends praesentiert",
        titleLine1: "Tuning",
        titleLine2: "Treffen",
        dateLabel: "19 · 04 · 2026",
        countdownEnd: "2026-04-19T12:00:00",
        badge: "EST. 2024 • HESSEN",
        tagline: "DriversClub Hessen × Mi Familia & Friends",
      },
      {
        blockType: "ticker",
        items: [],
      },
      {
        blockType: "event",
        sectionLabel: "Das Event",
        titleLead: "Was dich ",
        titleAccent: "erwartet",
        featuredEventText: "Sonntag · 12:00 - 20:00 · Birstein",
      },
      {
        blockType: "features",
        sectionLabel: "Highlights",
        titleLead: "Was auf dich ",
        titleAccent: "wartet",
        items: [],
      },
      {
        blockType: "rules",
        sectionLabel: "Wichtig",
        titleLead: "Die ",
        titleAccent: "Regeln",
        items: [],
      },
      {
        blockType: "about",
        sectionLabel: "Veranstalter",
        titleLead: "Die ",
        titleAccent: "Kollaboration",
        leftBadge: "MI FAMILIA & FRIENDS",
        leftName: "Mi Familia",
        rightBadge: "DRIVERS CLUB HESSEN",
        rightName: "DCH Est. 2024",
        body: DEFAULT_COLLAB_BODY,
      },
      {
        blockType: "location",
        sectionLabel: "Anfahrt",
        titleLead: "Der ",
        titleAccent: "Treffpunkt",
        mapUrl: "https://maps.google.com/?q=Industriestraße+6+63633+Birstein",
      },
      {
        blockType: "social",
        sectionLabel: "Folg uns",
        titleLead: "Bleib ",
        titleAccent: "connected",
        links: [],
      },
    ],
  });
