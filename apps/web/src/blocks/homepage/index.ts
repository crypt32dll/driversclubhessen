import type { Block } from "payload";

/** Homepage flexible layout — block order = page order. */
export const homepageLayoutBlocks: Block[] = [
  {
    slug: "hero",
    interfaceName: "HomepageHeroBlock",
    admin: {
      description:
        "Fallback-Hero, wenn kein anstehendes Event existiert. Sobald ein Event ansteht, uebernimmt das naechste Event die Hero-Inhalte (siehe Event → Startseiten-Hero).",
    },
    fields: [
      { name: "eyebrow", type: "text", required: true },
      { name: "titleLine1", type: "text", required: true },
      { name: "titleLine2", type: "text", required: true },
      { name: "dateLabel", type: "text", required: true },
      { name: "countdownEnd", type: "date" },
      {
        name: "badge",
        type: "text",
        label: "Hero-Badge",
        defaultValue: "EST. 2024 • HESSEN",
      },
      {
        name: "tagline",
        type: "text",
        label: "Hero-Fußzeile",
        defaultValue: "DriversClub Hessen × Mi Familia & Friends",
      },
      {
        name: "ctas",
        type: "array",
        labels: { singular: "Button", plural: "Buttons" },
        fields: [
          { name: "label", type: "text", required: true },
          { name: "href", type: "text", required: true },
          {
            name: "variant",
            type: "select",
            defaultValue: "primary",
            options: [
              { label: "Primary", value: "primary" },
              { label: "Outline", value: "outline" },
            ],
          },
        ],
      },
      {
        name: "backgroundImage",
        type: "upload",
        relationTo: "media",
        label: "Hintergrund (optional)",
      },
    ],
  },
  {
    slug: "ticker",
    interfaceName: "HomepageTickerBlock",
    fields: [
      {
        name: "items",
        type: "array",
        labels: { singular: "Zeile", plural: "Zeilen" },
        fields: [{ name: "text", type: "text", required: true }],
      },
    ],
  },
  {
    slug: "event",
    interfaceName: "HomepageEventBlock",
    fields: [
      { name: "sectionLabel", type: "text", defaultValue: "Das Event" },
      { name: "titleLead", type: "text", defaultValue: "Was dich " },
      { name: "titleAccent", type: "text", defaultValue: "erwartet" },
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
      },
    ],
  },
  {
    slug: "features",
    interfaceName: "HomepageFeaturesBlock",
    fields: [
      { name: "sectionLabel", type: "text", defaultValue: "Highlights" },
      { name: "titleLead", type: "text", defaultValue: "Was auf dich " },
      { name: "titleAccent", type: "text", defaultValue: "wartet" },
      {
        name: "items",
        type: "array",
        labels: { singular: "Feature", plural: "Features" },
        fields: [
          { name: "icon", type: "text", label: "Icon (Emoji/Text)" },
          {
            name: "iconImage",
            type: "upload",
            relationTo: "media",
            label: "Icon-Bild (optional)",
          },
          { name: "title", type: "text", required: true },
          { name: "description", type: "textarea", required: true },
        ],
      },
    ],
  },
  {
    slug: "rules",
    interfaceName: "HomepageRulesBlock",
    fields: [
      { name: "sectionLabel", type: "text", defaultValue: "Wichtig" },
      { name: "titleLead", type: "text", defaultValue: "Die " },
      { name: "titleAccent", type: "text", defaultValue: "Regeln" },
      {
        name: "items",
        type: "array",
        labels: { singular: "Regel", plural: "Regeln" },
        fields: [
          { name: "icon", type: "text", defaultValue: "✅" },
          { name: "text", type: "textarea", required: true },
        ],
      },
    ],
  },
  {
    slug: "about",
    interfaceName: "HomepageAboutBlock",
    fields: [
      { name: "sectionLabel", type: "text", defaultValue: "Veranstalter" },
      { name: "titleLead", type: "text", defaultValue: "Die " },
      { name: "titleAccent", type: "text", defaultValue: "Kollaboration" },
      {
        name: "leftBadge",
        type: "text",
        defaultValue: "MI FAMILIA & FRIENDS",
      },
      { name: "leftName", type: "text", defaultValue: "Mi Familia" },
      {
        name: "rightBadge",
        type: "text",
        defaultValue: "DRIVERS CLUB HESSEN",
      },
      { name: "rightName", type: "text", defaultValue: "DCH Est. 2024" },
      { name: "body", type: "textarea", label: "Beschreibung" },
    ],
  },
  {
    slug: "location",
    interfaceName: "HomepageLocationBlock",
    fields: [
      { name: "sectionLabel", type: "text", defaultValue: "Anfahrt" },
      { name: "titleLead", type: "text", defaultValue: "Der " },
      { name: "titleAccent", type: "text", defaultValue: "Treffpunkt" },
      {
        name: "mapUrl",
        type: "text",
        label: "Google Maps URL",
        defaultValue:
          "https://maps.google.com/?q=Industriestraße+6+63633+Birstein",
      },
      {
        name: "mapImage",
        type: "upload",
        relationTo: "media",
        label: "Karten-Vorschau (optional)",
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
    fields: [
      { name: "sectionLabel", type: "text", defaultValue: "Folg uns" },
      { name: "titleLead", type: "text", defaultValue: "Bleib " },
      { name: "titleAccent", type: "text", defaultValue: "connected" },
      { name: "intro", type: "textarea", label: "Einleitung" },
      {
        name: "links",
        type: "array",
        labels: { singular: "Link", plural: "Links" },
        fields: [
          { name: "label", type: "text", required: true },
          { name: "url", type: "text", required: true },
          {
            name: "openInNewTab",
            type: "checkbox",
            defaultValue: true,
          },
        ],
      },
    ],
  },
];
