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

/** Public event lifecycle — drives badges and upcoming list visibility. */
export const eventStatusSchema = z.enum([
  "planned",
  "confirmed",
  "sold_out",
  "cancelled",
]);

export const eventFaqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const eventBringItemSchema = z.object({
  item: z.string(),
});

export const eventSchema = z.object({
  id: z.number().optional(),
  documentId: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  location: z.string(),
  /** Straße, PLZ Ort — für Kalender-LOCATION und Beschreibung. */
  address: z.string().optional(),
  /** Optional: Eintritt / Ticketing-Zeile für Homepage-Info-Karten (erste Zeile = Hauptzeile). */
  admissionNote: z.string().optional(),
  /** Optional: vollständiger Google-Maps-Link; leer = Suche aus Adresse/Treffpunkt. */
  mapsUrl: z.string().optional(),
  /** Optional: Kicker im Homepage-Block «Das Event» wenn dieses Event Lead-Event ist. */
  homeEventSectionLabel: z.string().optional(),
  homeEventTitleLead: z.string().optional(),
  homeEventTitleAccent: z.string().optional(),
  /** Homepage «Anfahrt»-Überschriften bei Lead-Event. */
  homeLocationSectionLabel: z.string().optional(),
  homeLocationTitleLead: z.string().optional(),
  homeLocationTitleAccent: z.string().optional(),
  /** Homepage «Über uns»-Überschriften bei Lead-Event. */
  homeAboutSectionLabel: z.string().optional(),
  homeAboutTitleLead: z.string().optional(),
  homeAboutTitleAccent: z.string().optional(),
  /** Partner-Spalte links im Homepage-Block «Kollaboration», wenn dieses Event Lead-Event ist. */
  collabPartnerBadge: z.string().optional(),
  collabPartnerName: z.string().optional(),
  /** Fliesstext «Über uns» auf der Startseite für dieses Event. */
  collabAboutBody: z.string().optional(),
  /** Defaults to `planned` in the mapper when missing (legacy rows). */
  status: eventStatusSchema.optional(),
  createdAt: z.string().optional(),
  images: z.array(imageSchema).optional(),
  /** Homepage hero when this event is the next upcoming (from Payload `homepageHero` group). */
  heroEyebrow: z.string().optional(),
  heroTitleLine1: z.string().optional(),
  heroTitleLine2: z.string().optional(),
  heroBadge: z.string().optional(),
  heroTagline: z.string().optional(),
  heroCtas: z.array(heroCtaSchema).optional(),
  heroBackgroundImage: imageSchema.optional(),
  /** Override for `<title>` / OG title on `/events/[slug]` */
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  faq: z.array(eventFaqItemSchema).optional(),
  bringList: z.array(eventBringItemSchema).optional(),
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
export type EventStatus = z.infer<typeof eventStatusSchema>;
export type EventFaqItem = z.infer<typeof eventFaqItemSchema>;
export type EventBringItem = z.infer<typeof eventBringItemSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type HeroCta = z.infer<typeof heroCtaSchema>;
export type EventInfoCard = z.infer<typeof eventInfoCardSchema>;
export type SocialCmsLink = z.infer<typeof socialCmsLinkSchema>;
export type SiteNavItem = z.infer<typeof siteNavItemSchema>;
export type SiteNavigation = z.infer<typeof siteNavigationSchema>;
