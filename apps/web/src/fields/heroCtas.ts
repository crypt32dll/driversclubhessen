import type { Field } from "payload";

/** Reused by homepage hero block and Event `homepageHero` CTAs. */
export const heroCtaRowFields: Field[] = [
  { name: "label", type: "text", required: true },
  {
    name: "linkMode",
    type: "select",
    label: "Link-Ziel",
    required: true,
    defaultValue: "reference",
    options: [
      { label: "Intern (Event)", value: "reference" },
      { label: "Externe URL", value: "external" },
    ],
    admin: {
      description:
        "Intern: waehle ein Event aus der Liste. Extern: vollstaendige URL (oeffnet in neuem Tab).",
    },
  },
  {
    name: "eventReference",
    type: "relationship",
    relationTo: "events",
    label: "Event",
    /** Populate `slug` for storefront links when the parent doc is loaded with depth ≥ 1. */
    maxDepth: 1,
    admin: {
      condition: (_, siblingData) =>
        (siblingData as { linkMode?: string })?.linkMode !== "external",
    },
  },
  {
    name: "externalUrl",
    type: "text",
    label: "Externe URL",
    admin: {
      condition: (_, siblingData) =>
        (siblingData as { linkMode?: string })?.linkMode === "external",
      description: "z. B. https://instagram.com/…",
    },
    validate: (
      value: string | null | undefined,
      { siblingData }: { siblingData: Record<string, unknown> },
    ) => {
      const mode = siblingData?.linkMode;
      if (mode !== "external") return true;
      const v = typeof value === "string" ? value.trim() : "";
      if (!v) return "URL ist erforderlich.";
      if (!/^https?:\/\//i.test(v)) {
        return "Bitte mit http:// oder https:// beginnen.";
      }
      return true;
    },
  },
  {
    name: "variant",
    type: "select",
    defaultValue: "primary",
    options: [
      { label: "Primary", value: "primary" },
      { label: "Outline", value: "outline" },
    ],
  },
];
