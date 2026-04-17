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

export const homepageSchema = z.object({
  heroEyebrow: z.string(),
  heroTitleLine1: z.string(),
  heroTitleLine2: z.string(),
  heroDateLabel: z.string(),
  featuredEventText: z.string().optional(),
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
export type GalleryItem = z.infer<typeof galleryItemSchema>;
