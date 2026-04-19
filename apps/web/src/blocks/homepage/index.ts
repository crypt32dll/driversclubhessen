import type { Block } from "payload";

/** Homepage flexible layout — block order = page order. */
export const homepageLayoutBlocks: Block[] = [
  {
    slug: "hero",
    interfaceName: "HomepageHeroBlock",
    labels: {
      singular: "Hero",
      plural: "Hero",
    },
    fields: [
      {
        name: "heroEvent",
        type: "relationship",
        relationTo: "events",
        label: "Hero-Event",
        maxDepth: 2,
        admin: {
          description:
            "Hero (Titel, Countdown, CTAs, Hintergrund, …) kommt aus dem Event-Dokument → Gruppe „Startseiten-Hero“. Leer = naechstes anstehendes Event aus der Liste. Wenn kein Event verfuegbar ist, nutzt das Frontend feste Fallback-Texte.",
        },
      },
    ],
  },
  {
    slug: "ticker",
    interfaceName: "HomepageTickerBlock",
    labels: { singular: "Ticker-Leiste", plural: "Ticker-Leiste" },
    fields: [
      {
        name: "items",
        type: "array",
        labels: { singular: "Zeile", plural: "Zeilen" },
        admin: {
          description:
            "Lauftext-Zeilen unter dem Hero. Reihenfolge = Darstellungsreihenfolge.",
        },
        fields: [
          {
            name: "text",
            type: "text",
            required: true,
            admin: {
              description: "Eine Zeile im Ticker (kurz halten).",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "event",
    interfaceName: "HomepageEventBlock",
    labels: { singular: "Event-Abschnitt", plural: "Event-Abschnitt" },
    fields: [
      {
        name: "sectionLabel",
        type: "text",
        defaultValue: "Das Event",
        admin: {
          description:
            "Kleine Ueberschrift. Mit Lead-Event: optional auch im Event («Startseite — Anfahrt & Event-Abschnitt»); dieses Feld ist Fallback ohne Event oder wenn das Event-Feld leer ist.",
        },
      },
      {
        name: "titleLead",
        type: "text",
        defaultValue: "Was dich ",
        admin: {
          description: "Titel-Anfang (normale Schrift). Fallback wie oben.",
        },
      },
      {
        name: "titleAccent",
        type: "text",
        defaultValue: "erwartet",
        admin: {
          description: "Titel-Akzentteil (hervorgehoben). Fallback wie oben.",
        },
      },
      {
        name: "infoCards",
        type: "array",
        labels: { singular: "Info-Karte", plural: "Info-Karten" },
        admin: {
          description:
            "Nur Fallback ohne Lead-Event (kein anstehendes Event). Sonst: Karten automatisch aus dem Event.",
        },
        fields: [
          { name: "icon", type: "text", required: true },
          { name: "title", type: "text", required: true },
          { name: "value", type: "text", required: true },
          { name: "sub", type: "textarea", required: true },
        ],
      },
      {
        name: "featuredEvent",
        type: "relationship",
        relationTo: "events",
        maxDepth: 2,
        label: "Hervorgehobenes Event",
        admin: {
          description:
            "Optional; wird im Frontend nicht mehr fuer die Startseite ausgewertet — Lead-Event wie beim Hero (naechstes Event bzw. Hero-Event).",
        },
      },
    ],
  },
  {
    slug: "features",
    interfaceName: "HomepageFeaturesBlock",
    labels: { singular: "Highlights", plural: "Highlights" },
    fields: [
      {
        name: "sectionLabel",
        type: "text",
        defaultValue: "Highlights",
        admin: { description: "Kleine Ueberschrift ueber dem Abschnitt." },
      },
      {
        name: "titleLead",
        type: "text",
        defaultValue: "Was auf dich ",
        admin: { description: "Titel-Anfang." },
      },
      {
        name: "titleAccent",
        type: "text",
        defaultValue: "wartet",
        admin: { description: "Titel-Akzent." },
      },
      {
        name: "items",
        type: "array",
        labels: { singular: "Feature", plural: "Features" },
        admin: {
          description: "Kacheln im Highlights-Bereich der Startseite.",
        },
        fields: [
          {
            name: "icon",
            type: "text",
            label: "Icon (Emoji/Text)",
            admin: { description: "Kurzes Emoji oder Symbol neben dem Titel." },
          },
          {
            name: "iconImage",
            type: "upload",
            relationTo: "media",
            label: "Icon-Bild (optional)",
            admin: {
              description: "Optional: ersetzt oder ergaenzt das Text-Icon.",
            },
          },
          {
            name: "title",
            type: "text",
            required: true,
            admin: { description: "Feature-Ueberschrift." },
          },
          {
            name: "description",
            type: "textarea",
            required: true,
            admin: { description: "Kurzer Erklaertext unter dem Titel." },
          },
        ],
      },
    ],
  },
  {
    slug: "rules",
    interfaceName: "HomepageRulesBlock",
    labels: { singular: "Regeln", plural: "Regeln" },
    fields: [
      {
        name: "sectionLabel",
        type: "text",
        defaultValue: "Wichtig",
        admin: { description: "Kleine Ueberschrift." },
      },
      {
        name: "titleLead",
        type: "text",
        defaultValue: "Die ",
        admin: { description: "Titel-Anfang." },
      },
      {
        name: "titleAccent",
        type: "text",
        defaultValue: "Regeln",
        admin: { description: "Titel-Akzent." },
      },
      {
        name: "items",
        type: "array",
        labels: { singular: "Regel", plural: "Regeln" },
        admin: {
          description:
            "Aufzaehlung der Verhaltens-/Treffen-Regeln auf der Startseite.",
        },
        fields: [
          {
            name: "icon",
            type: "text",
            defaultValue: "✅",
            admin: { description: "Kleines Symbol vor dem Regeltext." },
          },
          {
            name: "text",
            type: "textarea",
            required: true,
            admin: { description: "Formulierung der Regel." },
          },
        ],
      },
    ],
  },
  {
    slug: "about",
    interfaceName: "HomepageAboutBlock",
    labels: { singular: "Ueber uns", plural: "Ueber uns" },
    fields: [
      {
        name: "sectionLabel",
        type: "text",
        defaultValue: "Veranstalter",
        admin: {
          description:
            "Kleine Ueberschrift. Mit Lead-Event: optional auch im Event («Startseite — Kollaboration»); dieses Feld ist Fallback ohne Event oder wenn das Event-Feld leer ist.",
        },
      },
      {
        name: "titleLead",
        type: "text",
        defaultValue: "Die ",
        admin: {
          description: "Titel-Anfang. Fallback wie oben.",
        },
      },
      {
        name: "titleAccent",
        type: "text",
        defaultValue: "Kollaboration",
        admin: {
          description: "Titel-Akzent. Fallback wie oben.",
        },
      },
      {
        name: "leftBadge",
        type: "text",
        defaultValue: "MI FAMILIA & FRIENDS",
        admin: {
          description:
            "Linkes Kreis-Label. Mit aktuellem Lead-Event: kann im Event unter «Kollaboration» überschrieben werden.",
        },
      },
      {
        name: "leftName",
        type: "text",
        defaultValue: "Mi Familia",
        admin: {
          description:
            "Name links unter dem Kreis. Mit Lead-Event: optional aus dem Event.",
        },
      },
      {
        name: "rightBadge",
        type: "text",
        defaultValue: "DRIVERS CLUB HESSEN",
        admin: {
          description:
            "Rechtes Kreis-Label (DriversClub Hessen) — typischerweise unverändert.",
        },
      },
      {
        name: "rightName",
        type: "text",
        defaultValue: "DCH Est. 2024",
        admin: {
          description: "Name rechts unter dem Kreis (DCH).",
        },
      },
      {
        name: "body",
        type: "textarea",
        label: "Beschreibung",
        admin: {
          description:
            "Fliesstext unter den Logos. Mit Lead-Event: optional aus dem Event («Beschreibungstext»).",
        },
      },
    ],
  },
  {
    slug: "location",
    interfaceName: "HomepageLocationBlock",
    labels: { singular: "Anfahrt", plural: "Anfahrt" },
    fields: [
      {
        name: "sectionLabel",
        type: "text",
        defaultValue: "Anfahrt",
        admin: {
          description:
            "Kleine Ueberschrift. Mit Lead-Event: optional auch im Event («Startseite — Anfahrt & Event-Abschnitt»); dieses Feld ist Fallback ohne Event oder wenn das Event-Feld leer ist.",
        },
      },
      {
        name: "titleLead",
        type: "text",
        defaultValue: "Der ",
        admin: {
          description: "Titel-Anfang. Fallback wie oben.",
        },
      },
      {
        name: "titleAccent",
        type: "text",
        defaultValue: "Treffpunkt",
        admin: {
          description: "Titel-Akzent. Fallback wie oben.",
        },
      },
      {
        name: "mapUrl",
        type: "text",
        label: "Google Maps URL",
        defaultValue:
          "https://maps.google.com/?q=Industriestraße+6+63633+Birstein",
        admin: {
          description:
            "Nur wenn kein Lead-Event: Link beim Klick. Mit aktuellem Event: Feld «Google Maps-Link» am Event (oder automatische Suche).",
        },
      },
      {
        name: "mapImage",
        type: "upload",
        relationTo: "media",
        label: "Karten-Vorschau (optional)",
        admin: {
          description: "Statisches Vorschaubild statt eingebetteter Karte.",
        },
      },
      {
        name: "rows",
        type: "array",
        labels: { singular: "Zeile", plural: "Zeilen" },
        admin: {
          description:
            "Nur ohne Lead-Event: manuelle Zeilen. Mit aktuellem Event: Adresse, Termin und Eintritt aus dem Event.",
        },
        fields: [
          { name: "icon", type: "text", defaultValue: "📍" },
          { name: "label", type: "text", required: true },
          { name: "value", type: "textarea", required: true },
        ],
      },
    ],
  },
  {
    slug: "social",
    interfaceName: "HomepageSocialBlock",
    labels: { singular: "Social", plural: "Social" },
    fields: [
      {
        name: "sectionLabel",
        type: "text",
        defaultValue: "Folg uns",
        admin: { description: "Kleine Ueberschrift." },
      },
      {
        name: "titleLead",
        type: "text",
        defaultValue: "Bleib ",
        admin: { description: "Titel-Anfang." },
      },
      {
        name: "titleAccent",
        type: "text",
        defaultValue: "connected",
        admin: { description: "Titel-Akzent." },
      },
      {
        name: "intro",
        type: "textarea",
        label: "Einleitung",
        admin: { description: "Kurzer Text vor der Link-Liste." },
      },
      {
        name: "links",
        type: "array",
        labels: { singular: "Link", plural: "Links" },
        admin: {
          description:
            "Social- oder externe Links im Footer-Bereich der Startseite.",
        },
        fields: [
          {
            name: "label",
            type: "text",
            required: true,
            admin: { description: "Sichtbarer Link-Text." },
          },
          {
            name: "url",
            type: "text",
            required: true,
            admin: {
              description: "Ziel-URL mit https:// (z. B. Instagram, TikTok).",
            },
          },
          {
            name: "openInNewTab",
            type: "checkbox",
            defaultValue: true,
            admin: {
              description: "Externe Seiten typischerweise in neuem Tab.",
            },
          },
        ],
      },
    ],
  },
];
