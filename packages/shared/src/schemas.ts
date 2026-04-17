import { z } from "zod";

/** Strapi Blocks (richtext) — validated at runtime in the web app via BlocksRenderer */
export const blocksContentSchema = z.array(z.record(z.unknown()));

export const imageSchema = z.object({
  url: z.string(),
  alternativeText: z.string().nullable().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const eventSchema = z.object({
  id: z.number().optional(),
  documentId: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  /** Strapi v5 richtext is Blocks JSON; plain string kept for fallbacks */
  description: z.union([z.string(), blocksContentSchema]),
  date: z.string(),
  location: z.string(),
  createdAt: z.string().optional(),
  images: z.array(imageSchema).optional(),
});

export const homepageSectionVariantSchema = z.enum([
  "highlight",
  "rule",
  "about",
  "location",
  "social",
]);

export const homepageSectionSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  order: z.number().optional(),
  variant: homepageSectionVariantSchema.optional(),
  icon: z.string().optional(),
});

export const homepageSchema = z.object({
  heroEyebrow: z.string(),
  heroTitleLine1: z.string(),
  heroTitleLine2: z.string(),
  heroDateLabel: z.string(),
  /** ISO datetime for the hero countdown target (optional; falls back in UI). */
  heroCountdownEnd: z.string().optional(),
  featuredEventText: z.string().optional(),
  /** Dynamic zone `homepage.section-item` entries from Strapi. */
  sections: z.array(homepageSectionSchema).optional(),
});

export const galleryItemSchema = z.object({
  id: z.number().optional(),
  documentId: z.string().optional(),
  title: z.string(),
  uploadedAt: z.string().optional(),
  image: imageSchema,
});

export type Event = z.infer<typeof eventSchema>;
export type Homepage = z.infer<typeof homepageSchema>;
export type HomepageSection = z.infer<typeof homepageSectionSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
