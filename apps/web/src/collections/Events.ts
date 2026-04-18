import type { CollectionConfig } from "payload";

import { heroCtaRowFields } from "../fields/heroCtas.ts";
import {
  revalidateEvents,
  revalidateEventsDelete,
} from "../payload/hooks/revalidate.ts";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "date", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    { name: "date", type: "date", required: true },
    { name: "location", type: "text", required: true },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      type: "collapsible",
      label: "SEO — Event-Detail (/events/…)",
      admin: {
        initCollapsed: true,
        description:
          "Suchmaschinen-Titel und -Text für diese Event-URL. Leer = automatisch aus Titel, Datum und Ort.",
      },
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta-Titel",
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta-Beschreibung",
        },
      ],
    },
    {
      name: "homepageHero",
      type: "group",
      label: "Startseiten-Hero",
      admin: {
        description:
          "Wenn dieses Event das naechste anstehende ist, ersetzt es die Hero-Inhalte der Startseite (Titel, Countdown, optional Hintergrund). Leere Felder nutzen sinnvolle Standardwerte aus Titel und Datum.",
      },
      fields: [
        {
          name: "eyebrow",
          type: "text",
          label: "Eyebrow",
        },
        {
          name: "titleLine1",
          type: "text",
          label: "Titel Zeile 1",
        },
        {
          name: "titleLine2",
          type: "text",
          label: "Titel Zeile 2",
        },
        {
          name: "dateLabel",
          type: "text",
          label: "Datumszeile (optional)",
          admin: {
            description:
              "Steht unter dem Titel, z. B. formatiertes Datum. Leer = automatisch aus Event-Datum.",
          },
        },
        {
          name: "countdownEnd",
          type: "date",
          label: "Countdown-Ziel",
          admin: {
            description:
              "Datum und Uhrzeit fuer den Countdown. Leer = Event-Datum um 12:00 Uhr.",
            date: {
              pickerAppearance: "dayAndTime",
            },
          },
        },
        {
          name: "badge",
          type: "text",
          label: "Badge",
        },
        {
          name: "tagline",
          type: "text",
          label: "Fusszeile / Tagline",
        },
        {
          name: "ctas",
          type: "array",
          labels: { singular: "Button", plural: "Buttons" },
          fields: heroCtaRowFields,
        },
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
          label: "Hintergrundbild (optional)",
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateEvents],
    afterDelete: [revalidateEventsDelete],
  },
};
