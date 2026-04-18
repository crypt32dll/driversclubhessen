import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";

import {
  revalidatePages,
  revalidatePagesDelete,
} from "../payload/hooks/revalidate.ts";

function normalizePageSlug(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw
    .trim()
    .toLowerCase()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

const normalizeSlugBeforeSave: CollectionBeforeChangeHook = ({ data }) => {
  if (!data || typeof data !== "object") return;
  const slug = (data as { slug?: unknown }).slug;
  if (typeof slug === "string") {
    (data as { slug: string }).slug = normalizePageSlug(slug);
  }
};

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Seite (SEO)",
    plural: "Seiten (SEO)",
  },
  admin: {
    useAsTitle: "slug",
    defaultColumns: ["slug", "updatedAt"],
    description:
      "Meta-Titel und -Beschreibung pro Route. Slug **home** = Startseite; sonst ohne Domain und ohne führenden Slash (z. B. events, gallery, legal/impressum, events/dein-event-slug).",
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: "collapsible",
      label: "Seite & SEO",
      admin: {
        initCollapsed: true,
        description:
          "URL-Schlüssel (slug) und Meta-Daten für diese Marketing-Seite.",
      },
      fields: [
        {
          name: "slug",
          type: "text",
          label: "Slug",
          required: true,
          unique: true,
          index: true,
          admin: {
            description:
              "**home** für die Startseite. Beispiele: **events**, **gallery**, **legal/impressum**, **events/meet-2026**.",
          },
        },
        {
          name: "metaTitle",
          type: "text",
          label: "Meta-Titel",
          admin: {
            description: "Optional. Leer = Standard aus dem Code für diese Route.",
          },
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta-Beschreibung",
          admin: {
            description: "Empfohlen bis ca. 160 Zeichen.",
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [normalizeSlugBeforeSave],
    afterChange: [revalidatePages],
    afterDelete: [revalidatePagesDelete],
  },
};
