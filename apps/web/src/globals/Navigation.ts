import type { GlobalConfig } from "payload";

import { revalidateNavigation } from "../payload/hooks/revalidate.ts";

const internalTargetOptions = [
  { label: "Startseite", value: "home" },
  { label: "Startseite · Aktuell", value: "homeEvent" },
  { label: "Startseite · Über uns", value: "homeAbout" },
  { label: "Startseite · Anfahrt", value: "homeLocation" },
  { label: "Startseite · Social", value: "homeSocial" },
  { label: "Events", value: "events" },
  { label: "Galerie", value: "gallery" },
  { label: "FAQ & Community", value: "faq" },
  { label: "Impressum", value: "impressum" },
  { label: "Datenschutz", value: "datenschutz" },
] as const;

export const Navigation: GlobalConfig = {
  slug: "navigation",
  admin: {
    description:
      "Header-Navigation der Marketing-Site. Interne Ziele werden zu festen URLs (inkl. Anker auf der Startseite).",
  },
  versions: {
    drafts: {
      autosave: {
        interval: 500,
      },
    },
  },
  label: "Navigation",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "items",
      type: "array",
      labels: { singular: "Link", plural: "Links" },
      admin: {
        description:
          "Hauptnavigation (Header). Interne Ziele entsprechen den Marketing-Routen in dieser App.",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          admin: {
            description: "Sichtbarer Text im Menue.",
          },
        },
        {
          name: "linkType",
          type: "select",
          required: true,
          defaultValue: "internal",
          options: [
            { label: "Interne Seite", value: "internal" },
            { label: "Externe URL", value: "external" },
          ],
          admin: {
            description:
              "Intern: Seite oder Anker in dieser App. Extern: beliebige URL (z. B. Social).",
          },
        },
        {
          name: "internalTarget",
          type: "select",
          label: "Seite",
          options: [...internalTargetOptions],
          admin: {
            condition: (_data, sibling) => sibling?.linkType !== "external",
            description:
              "Startseite → / · Aktuell → /#aktuell · Ueber uns → /#about · Anfahrt → /#location · Social → /#social · Events → /events · Galerie → /gallery · FAQ → /faq · Impressum → /legal/impressum · Datenschutz → /legal/datenschutz",
          },
        },
        {
          name: "externalUrl",
          type: "text",
          label: "Externe URL",
          admin: {
            condition: (_data, sibling) => sibling?.linkType === "external",
            description: "Vollständige URL, z. B. https://instagram.com/…",
          },
        },
        {
          name: "openInNewTab",
          type: "checkbox",
          label: "In neuem Tab öffnen",
          defaultValue: false,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateNavigation],
  },
};
