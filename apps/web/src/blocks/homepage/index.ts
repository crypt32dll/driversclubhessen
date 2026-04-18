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
        admin: { description: "Kleine Ueberschrift ueber dem Abschnitt." },
      },
      {
        name: "titleLead",
        type: "text",
        defaultValue: "Was dich ",
        admin: { description: "Titel-Anfang (normale Schrift)." },
      },
      {
        name: "titleAccent",
        type: "text",
        defaultValue: "erwartet",
        admin: { description: "Titel-Akzentteil (hervorgehoben)." },
      },
      {
        name: "infoCards",
        type: "array",
        labels: { singular: "Info-Karte", plural: "Info-Karten" },
        admin: {
          description:
            "Anzeige wenn keine Events aus der Datenbank geladen werden.",
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
            "Daten fuer den Event-Teaser (wenn die Seite Events aus der API laedt). Info-Karten darueber gelten als Fallback ohne API-Daten.",
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
          description: "Aufzaehlung der Verhaltens-/Treffen-Regeln auf der Startseite.",
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
        defaultValue: "Kollaboration",
        admin: { description: "Titel-Akzent." },
      },
      {
        name: "leftBadge",
        type: "text",
        defaultValue: "MI FAMILIA & FRIENDS",
        admin: { description: "Kleines Label in der linken Spalte." },
      },
      {
        name: "leftName",
        type: "text",
        defaultValue: "Mi Familia",
        admin: { description: "Name / Titel in der linken Spalte." },
      },
      {
        name: "rightBadge",
        type: "text",
        defaultValue: "DRIVERS CLUB HESSEN",
        admin: { description: "Kleines Label in der rechten Spalte." },
      },
      {
        name: "rightName",
        type: "text",
        defaultValue: "DCH Est. 2024",
        admin: { description: "Name / Titel in der rechten Spalte." },
      },
      {
        name: "body",
        type: "textarea",
        label: "Beschreibung",
        admin: {
          description: "Fliesstext im «Ueber uns»-Bereich zwischen den beiden Spalten.",
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
        admin: { description: "Kleine Ueberschrift." },
      },
      {
        name: "titleLead",
        type: "text",
        defaultValue: "Der ",
        admin: { description: "Titel-Anfang." },
      },
      {
        name: "titleAccent",
        type: "text",
        defaultValue: "Treffpunkt",
        admin: { description: "Titel-Akzent." },
      },
      {
        name: "mapUrl",
        type: "text",
        label: "Google Maps URL",
        defaultValue:
          "https://maps.google.com/?q=Industriestraße+6+63633+Birstein",
        admin: {
          description:
            "Link, der beim Klick auf die Karte geoeffnet wird (vollstaendige https://… URL).",
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
            "Optional: strukturierte Infos (Adresse, Zeiten, …). Leer = Standard-Fallback im Frontend.",
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
          description: "Social- oder externe Links im Footer-Bereich der Startseite.",
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
