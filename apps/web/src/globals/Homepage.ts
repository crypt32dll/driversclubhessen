import type { GlobalConfig } from "payload";

import { homepageLayoutBlocks } from "../blocks/homepage/index.ts";
import { revalidateHomepage } from "../payload/hooks/revalidate.ts";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
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
        description: "Meta-Titel und -Beschreibung für die Startseite.",
      },
      fields: [
        {
          name: "homeMetaTitle",
          type: "text",
          label: "Meta-Titel",
        },
        {
          name: "homeMetaDescription",
          type: "textarea",
          label: "Meta-Beschreibung",
        },
      ],
    },
    {
      type: "collapsible",
      label: "SEO — Events-Übersicht (/events)",
      admin: {
        initCollapsed: true,
        description: "Meta für die Liste aller Events.",
      },
      fields: [
        {
          name: "eventsIndexMetaTitle",
          type: "text",
          label: "Meta-Titel",
        },
        {
          name: "eventsIndexMetaDescription",
          type: "textarea",
          label: "Meta-Beschreibung",
        },
      ],
    },
    {
      type: "collapsible",
      label: "SEO — Galerie (/gallery)",
      admin: {
        initCollapsed: true,
        description: "Meta für die Galerie-Übersichtsseite.",
      },
      fields: [
        {
          name: "galleryMetaTitle",
          type: "text",
          label: "Meta-Titel",
        },
        {
          name: "galleryMetaDescription",
          type: "textarea",
          label: "Meta-Beschreibung",
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomepage],
  },
};
