import { z } from "zod";

/** Strapi Blocks (richtext) — validated at runtime in the web app via BlocksRenderer */
export const blocksContentSchema = z.array(z.record(z.unknown()));

export const imageSchema = z.object({
  url: z.string(),
  alternativeText: z.string().nullable().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const heroCtaSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(["primary", "outline"]).optional(),
  /** When true, render with `target="_blank"` (CMS “Externe URL” mode). */
  openInNewTab: z.boolean().optional(),
});

export const eventSchema = z.object({
  id: z.number().optional(),
  documentId: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  location: z.string(),
  createdAt: z.string().optional(),
  images: z.array(imageSchema).optional(),
  /** Homepage hero when this event is the next upcoming (from Payload `homepageHero` group). */
  heroEyebrow: z.string().optional(),
  heroTitleLine1: z.string().optional(),
  heroTitleLine2: z.string().optional(),
  heroDateLabel: z.string().optional(),
  /** ISO datetime for countdown target */
  heroCountdownEnd: z.string().optional(),
  heroBadge: z.string().optional(),
  heroTagline: z.string().optional(),
  heroCtas: z.array(heroCtaSchema).optional(),
  heroBackgroundImage: imageSchema.optional(),
  /** Override for `<title>` / OG title on `/events/[slug]` */
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export const eventInfoCardSchema = z.object({
  icon: z.string(),
  title: z.string(),
  value: z.string(),
  sub: z.string(),
});

export const socialCmsLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  newTab: z.boolean().optional(),
});

export const galleryItemSchema = z.object({
  id: z.number().optional(),
  documentId: z.string().optional(),
  title: z.string(),
  uploadedAt: z.string().optional(),
  image: imageSchema,
});

export const siteNavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  external: z.boolean().optional(),
});

export const siteNavigationSchema = z.object({
  items: z.array(siteNavItemSchema),
});

export type Event = z.infer<typeof eventSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type HeroCta = z.infer<typeof heroCtaSchema>;
export type EventInfoCard = z.infer<typeof eventInfoCardSchema>;
export type SocialCmsLink = z.infer<typeof socialCmsLinkSchema>;
export type SiteNavItem = z.infer<typeof siteNavItemSchema>;
export type SiteNavigation = z.infer<typeof siteNavigationSchema>;
