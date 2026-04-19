import type { CollectionConfig } from "payload";

import { heroCtaRowFields } from "../fields/heroCtas.ts";
import {
  revalidateEvents,
  revalidateEventsDelete,
} from "../payload/hooks/revalidate.ts";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const Events: CollectionConfig = {
  slug: "events",
  defaultSort: "date",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "date", "status", "updatedAt"],
    description:
      "Events erscheinen in der Liste unter /events und als Detailseite unter /events/<slug>. Bilder und Startseiten-Hero-Felder steuern zusaetzlich die Startseite.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description:
          "Oeffentlicher Event-Name. Wird auf Karten, der Event-Seite und — falls kein Meta-Titel gesetzt ist — im Browser-Tab verwendet.",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      validate: (value: unknown) => {
        if (value === null || value === undefined) return true;
        if (typeof value !== "string") return "Ungültiger Slug.";
        const v = value.trim();
        if (!SLUG_PATTERN.test(v)) {
          return "Nur Kleinbuchstaben, Zahlen und einzelne Bindestriche (keine Leerzeichen, keine Slashes).";
        }
        return true;
      },
      admin: {
        description:
          "URL-Pfad ohne Schraegstriche und Leerzeichen: nur Kleinbuchstaben, Zahlen und Bindestriche (z. B. birstein-19-4-2026). Im Web: https://…/events/<slug> — der Slug ist der letzte Teil der Adresse.",
      },
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: {
        description:
          "Einzige Zeitquelle: Kalender-Export, Hero-Datumszeile und Countdown auf Start- und Event-Seite leiten sich daraus ab. Mit Uhrzeit = Startzeit; ohne konkrete Uhrzeit = ganztägig (Kalender/Hero entsprechend).",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "location",
      type: "text",
      required: true,
      admin: {
        description:
          "Kurzer Orts- oder Treffpunkt-Text auf der Event-Seite und in Snippets, wenn keine eigene Meta-Beschreibung gesetzt ist.",
      },
    },
    {
      name: "address",
      type: "text",
      admin: {
        description:
          "Optionale vollständige Adresse (Straße, PLZ Ort). Wird in Kalender-Einträgen (ICS / Google) zusätzlich zum Treffpunkt übernommen.",
      },
    },
    {
      name: "admissionNote",
      type: "textarea",
      label: "Eintritt / Ticketing",
      admin: {
        description:
          "Optional für die Startseiten-Info-Karte «Eintritt» (z. B. «Kostenlos» oder erste Zeile Preis, zweite Zeile Hinweis). Leer = Standard «Kostenlos».",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "planned",
      options: [
        {
          label: "Geplant",
          value: "planned",
        },
        {
          label: "Bestätigt",
          value: "confirmed",
        },
        {
          label: "Ausverkauft",
          value: "sold_out",
        },
        {
          label: "Abgesagt",
          value: "cancelled",
        },
      ],
      admin: {
        description:
          "«Abgesagt» blendet das Event auf der öffentlichen Übersicht und im Kalender-Feed aus; die Detail-URL bleibt erreichbar. «Ausverkauft» zeigt ein Badge, bleibt aber sichtbar.",
      },
    },
    {
      type: "collapsible",
      label: "FAQ & Checkliste",
      admin: {
        initCollapsed: true,
        description:
          "Optional: Fragen/Antworten und «Was mitbringen» — rein textbasiert, ohne Galerie.",
      },
      fields: [
        {
          name: "faq",
          type: "array",
          labels: { singular: "FAQ", plural: "FAQ" },
          admin: {
            description:
              "Kurze Fragen und Antworten zur Event-Seite (z. B. Anmeldung, Treffpunkt).",
          },
          fields: [
            {
              name: "question",
              type: "text",
              required: true,
              admin: { description: "Frage (kurz)." },
            },
            {
              name: "answer",
              type: "textarea",
              required: true,
              admin: {
                description: "Antwort — ein bis zwei Sätze reichen oft.",
              },
            },
          ],
        },
        {
          name: "bringList",
          type: "array",
          labels: { singular: "Punkt", plural: "Checkliste" },
          admin: {
            description:
              "Stichpunkte «Was mitbringen» (z. B. Ausweis, Wetterjacke).",
          },
          fields: [
            {
              name: "item",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      admin: {
        description:
          "Galerie auf der Event-Detailseite. Reihenfolge entspricht der Anzeige; erstes Bild wird oft als Hauptmotiv genutzt.",
      },
    },
    {
      type: "collapsible",
      label: "SEO — Event-Detail (/events/…)",
      admin: {
        initCollapsed: true,
        description:
          "Steuert HTML <title> und die Meta-Description (u. a. Google-Snippets, Social-Previews). Wenn leer, nutzt die Seite als Titel «Eventtitel | DriversClub Hessen» und als Beschreibung eine Zeile aus Titel, Datum und Ort.",
      },
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta-Titel",
          admin: {
            description:
              "Erscheint im Browser-Tab und als Hauptzeile in Suchergebnissen. Leer = automatisch der Eventtitel plus «| DriversClub Hessen».",
          },
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta-Beschreibung",
          validate: (value: unknown) => {
            if (value === null || value === undefined || value === "") {
              return true;
            }
            if (typeof value !== "string")
              return "Ungültige Meta-Beschreibung.";
            if (value.length > 160) {
              return "Maximal 160 Zeichen (Such-Snippet).";
            }
            return true;
          },
          admin: {
            description:
              "Kurzer Teaser unter dem Titel in Suchergebnissen (ca. 150–160 Zeichen empfohlen). Beeinflusst die Klickrate, nicht direkt das Ranking. Leer = automatische Zeile aus Titel, Datum und Ort.",
          },
        },
      ],
    },
    {
      name: "homepageHero",
      type: "group",
      label: "Startseiten-Hero",
      admin: {
        description:
          "Wenn dieses Event das naechste anstehende ist, steuert es die Startseiten-Hero-Inhalte (Titel, optional Hintergrund). Datum und Countdown kommen immer aus dem Feld «Datum» oben.",
      },
      fields: [
        {
          name: "eyebrow",
          type: "text",
          label: "Eyebrow",
          admin: {
            description:
              "Kleine Zeile ueber dem grossen Titel im Hero auf der Startseite.",
          },
        },
        {
          name: "titleLine1",
          type: "text",
          label: "Titel Zeile 1",
          admin: {
            description: "Erste grosse Titelzeile im Startseiten-Hero.",
          },
        },
        {
          name: "titleLine2",
          type: "text",
          label: "Titel Zeile 2",
          admin: {
            description:
              "Zweite grosse Titelzeile im Startseiten-Hero (oft Akzent-Wort).",
          },
        },
        {
          name: "badge",
          type: "text",
          label: "Badge",
          admin: {
            description:
              "Kompaktes Label im Hero (z. B. Event-Name oder Sponsoring).",
          },
        },
        {
          name: "tagline",
          type: "text",
          label: "Fusszeile / Tagline",
          admin: {
            description: "Text unter den Buttons im Hero.",
          },
        },
        {
          name: "ctas",
          type: "array",
          labels: { singular: "Button", plural: "Buttons" },
          admin: {
            description:
              "Call-to-Actions im Startseiten-Hero. «Intern (Event)» verlinkt auf /events/<slug> des gewaehlten Events.",
          },
          fields: heroCtaRowFields,
        },
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
          label: "Hintergrundbild (optional)",
          admin: {
            description:
              "Grossflaechiges Hero-Hintergrundbild auf der Startseite (LCP-relevant).",
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Startseite — Anfahrt & Event-Abschnitt",
      admin: {
        initCollapsed: true,
        description:
          "Gilt, wenn dieses Event auf der Startseite als aktuelles Lead-Event erscheint (gleiche automatische Auswahl wie beim Hero — keine extra Referenz im Homepage-Layout). Leer = Vorgaben aus den jeweiligen Homepage-Bloecken.",
      },
      fields: [
        {
          name: "mapsUrl",
          type: "text",
          label: "Google Maps-Link",
          admin: {
            description:
              "Optional: vollstaendige https://-URL fuer «In Google Maps oeffnen». Leer = automatische Suche aus Adresse bzw. Treffpunkt.",
          },
        },
        {
          name: "homeEventSectionLabel",
          type: "text",
          label: "Kicker «Das Event»",
          admin: {
            description:
              "Kleine Zeile ueber dem Event-Abschnitt auf der Startseite. Leer = Wert aus Homepage-Layout.",
          },
        },
        {
          name: "homeEventTitleLead",
          type: "text",
          label: "Titel-Anfang «Das Event»",
          admin: {
            description:
              "Erster Teil der grossen Ueberschrift. Leer = Homepage-Layout.",
          },
        },
        {
          name: "homeEventTitleAccent",
          type: "text",
          label: "Titel-Akzent «Das Event»",
          admin: {
            description:
              "Hervorgehobener Teil der Ueberschrift. Leer = Homepage-Layout.",
          },
        },
        {
          name: "homeLocationSectionLabel",
          type: "text",
          label: "Kicker «Anfahrt»",
          admin: {
            description:
              "Kleine Zeile ueber dem Anfahrt-Block. Leer = Homepage-Layout.",
          },
        },
        {
          name: "homeLocationTitleLead",
          type: "text",
          label: "Titel-Anfang «Anfahrt»",
          admin: {
            description:
              "Erster Teil der grossen Ueberschrift. Leer = Homepage-Layout.",
          },
        },
        {
          name: "homeLocationTitleAccent",
          type: "text",
          label: "Titel-Akzent «Anfahrt»",
          admin: {
            description: "Hervorgehobener Teil. Leer = Homepage-Layout.",
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Startseite — Kollaboration (Über uns)",
      admin: {
        initCollapsed: true,
        description:
          "Linkes Logo/Label, Partner-Name und Beschreibung fuer den Abschnitt «Die Kollaboration», wenn dieses Event das aktuelle Lead-Event ist. Rechts bleibt DriversClub Hessen (Anzeige aus Homepage-Layout oder Standard).",
      },
      fields: [
        {
          name: "homeAboutSectionLabel",
          type: "text",
          label: "Kicker «Über uns»",
          admin: {
            description:
              "Kleine Zeile ueber dem Kollaborations-Block. Leer = Homepage-Layout.",
          },
        },
        {
          name: "homeAboutTitleLead",
          type: "text",
          label: "Titel-Anfang «Kollaboration»",
          admin: {
            description:
              "Erster Teil der grossen Ueberschrift. Leer = Homepage-Layout.",
          },
        },
        {
          name: "homeAboutTitleAccent",
          type: "text",
          label: "Titel-Akzent «Kollaboration»",
          admin: {
            description: "Hervorgehobener Teil. Leer = Homepage-Layout.",
          },
        },
        {
          name: "collabPartnerBadge",
          type: "text",
          label: "Partner — Badge (Kreis)",
          admin: {
            description:
              "Kurzes Label im linken Kreis (z. B. «MI FAMILIA & FRIENDS»). Leer = Werte aus dem Homepage-Block «Ueber uns».",
          },
        },
        {
          name: "collabPartnerName",
          type: "text",
          label: "Partner — Name",
          admin: {
            description: "Name unter dem linken Kreis. Leer = Homepage-Block.",
          },
        },
        {
          name: "collabAboutBody",
          type: "textarea",
          label: "Beschreibungstext",
          admin: {
            description:
              "Fliesstext unter den Logos. Leer = Text aus dem Homepage-Block.",
          },
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data || typeof data !== "object") return;
        const d = data as Record<string, unknown>;
        if (d.status === undefined || d.status === null) {
          d.status = "planned";
        }
      },
    ],
    afterChange: [revalidateEvents],
    afterDelete: [revalidateEventsDelete],
  },
};
