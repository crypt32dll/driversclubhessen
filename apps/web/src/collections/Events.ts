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
          "Event-Datum (und ggf. Uhrzeit je nach Feld-Konfiguration). Wird auf der Event-Seite, in Listen und fuer Countdown-/Datums-Fallbacks genutzt.",
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
          "Wenn dieses Event das naechste anstehende ist, ersetzt es die Hero-Inhalte der Startseite (Titel, Countdown, optional Hintergrund). Leere Felder nutzen sinnvolle Standardwerte aus Titel und Datum.",
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
  ],
  hooks: {
    afterChange: [revalidateEvents],
    afterDelete: [revalidateEventsDelete],
  },
};
