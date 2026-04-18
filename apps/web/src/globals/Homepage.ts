import type { GlobalConfig } from "payload";

import { homepageLayoutBlocks } from "../blocks/homepage/index.ts";
import { revalidateHomepage } from "../payload/hooks/revalidate.ts";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  admin: {
    description:
      "Startseiten-Layout (Blockreihenfolge) und SEO-Felder fuer /, /events, /gallery. Aenderungen wirken nach Veroeffentlichung und Revalidierung auf die Live-Site.",
  },
  versions: {
    drafts: {
      autosave: {
        interval: 500,
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "layout",
      type: "blocks",
      label: "Seitenaufbau",
      admin: {
        description:
          "Reihenfolge der Blöcke = Reihenfolge auf der Startseite. Leer = Standard-Fallback aus dem Frontend.",
      },
      blocks: homepageLayoutBlocks,
    },
    {
      type: "collapsible",
      label: "SEO — Startseite (/)",
      admin: {
        initCollapsed: true,
        description:
          "Setzt <title> und Meta-Description fuer die Route /. Leer = Site-Standard («DriversClub Hessen» und die globale Kurzbeschreibung aus dem Code).",
      },
      fields: [
        {
          name: "homeMetaTitle",
          type: "text",
          label: "Meta-Titel",
          admin: {
            description:
              "Browser-Tab und Hauptzeile in Suchergebnissen fuer die Startseite.",
          },
        },
        {
          name: "homeMetaDescription",
          type: "textarea",
          label: "Meta-Beschreibung",
          admin: {
            description:
              "Kurztext in Snippets (ca. 150–160 Zeichen). Leer = Standardbeschreibung der Site aus dem Code.",
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "SEO — Events-Übersicht (/events)",
      admin: {
        initCollapsed: true,
        description:
          "Gilt fuer die Event-Liste unter /events. Leer = Fallback «Events | DriversClub Hessen» bzw. die feste Standard-Beschreibung der Events-Seite.",
      },
      fields: [
        {
          name: "eventsIndexMetaTitle",
          type: "text",
          label: "Meta-Titel",
          admin: {
            description:
              "Titel fuer die Events-Uebersicht im Tab und in Suchmaschinen.",
          },
        },
        {
          name: "eventsIndexMetaDescription",
          type: "textarea",
          label: "Meta-Beschreibung",
          admin: {
            description:
              "Snippet-Text fuer /events. Leer = Standardtext der Events-Seite.",
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "SEO — Galerie (/gallery)",
      admin: {
        initCollapsed: true,
        description:
          "Gilt fuer /gallery. Leer = «Galerie | DriversClub Hessen» und die feste Standard-Beschreibung der Galerie-Seite.",
      },
      fields: [
        {
          name: "galleryMetaTitle",
          type: "text",
          label: "Meta-Titel",
          admin: {
            description: "Titel fuer die Galerie-Uebersicht.",
          },
        },
        {
          name: "galleryMetaDescription",
          type: "textarea",
          label: "Meta-Beschreibung",
          admin: {
            description:
              "Snippet-Text fuer die Galerie. Leer = Standardtext der Galerie-Seite.",
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomepage],
  },
};
