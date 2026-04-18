import { z } from "zod";

import { eventInfoCardSchema, eventSchema, imageSchema } from "./schemas";

const idField = z.string().optional();

export const homepageHeroBlockViewSchema = z.object({
  blockType: z.literal("hero"),
  id: idField,
  /**
   * From Payload `heroEvent`. Hero copy, CTAs, and media come from this
   * document’s `homepageHero` group (and title/date); no extra fields on the block.
   */
  heroSourceEvent: eventSchema.optional(),
});

export const homepageTickerBlockViewSchema = z.object({
  blockType: z.literal("ticker"),
  id: idField,
  items: z.array(z.string()),
});

export const homepageEventBlockViewSchema = z.object({
  blockType: z.literal("event"),
  id: idField,
  sectionLabel: z.string().optional(),
  titleLead: z.string().optional(),
  titleAccent: z.string().optional(),
  infoCards: z.array(eventInfoCardSchema).optional(),
  /** Populated featured event id for client linking — full event resolved in page when needed */
  featuredEventSlug: z.string().optional(),
  featuredEventText: z.string().optional(),
});

export const homepageFeatureRowSchema = z.object({
  icon: z.string().optional(),
  title: z.string(),
  description: z.string(),
  iconImage: imageSchema.optional(),
});

export const homepageFeaturesBlockViewSchema = z.object({
  blockType: z.literal("features"),
  id: idField,
  sectionLabel: z.string().optional(),
  titleLead: z.string().optional(),
  titleAccent: z.string().optional(),
  items: z.array(homepageFeatureRowSchema),
});

export const homepageRuleRowSchema = z.object({
  icon: z.string(),
  text: z.string(),
});

export const homepageRulesBlockViewSchema = z.object({
  blockType: z.literal("rules"),
  id: idField,
  sectionLabel: z.string().optional(),
  titleLead: z.string().optional(),
  titleAccent: z.string().optional(),
  items: z.array(homepageRuleRowSchema),
});

export const homepageAboutBlockViewSchema = z.object({
  blockType: z.literal("about"),
  id: idField,
  sectionLabel: z.string().optional(),
  titleLead: z.string().optional(),
  titleAccent: z.string().optional(),
  leftBadge: z.string().optional(),
  leftName: z.string().optional(),
  rightBadge: z.string().optional(),
  rightName: z.string().optional(),
  body: z.string().optional(),
});

export const homepageLocationRowSchema = z.object({
  icon: z.string().optional(),
  label: z.string(),
  value: z.string(),
});

export const homepageLocationBlockViewSchema = z.object({
  blockType: z.literal("location"),
  id: idField,
  sectionLabel: z.string().optional(),
  titleLead: z.string().optional(),
  titleAccent: z.string().optional(),
  mapUrl: z.string().optional(),
  mapImage: imageSchema.optional(),
  rows: z.array(homepageLocationRowSchema).optional(),
});

export const homepageSocialLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  newTab: z.boolean().optional(),
});

export const homepageSocialBlockViewSchema = z.object({
  blockType: z.literal("social"),
  id: idField,
  sectionLabel: z.string().optional(),
  titleLead: z.string().optional(),
  titleAccent: z.string().optional(),
  intro: z.string().optional(),
  links: z.array(homepageSocialLinkSchema).optional(),
});

export const homepageLayoutBlockViewSchema = z.discriminatedUnion(
  "blockType",
  [
    homepageHeroBlockViewSchema,
    homepageTickerBlockViewSchema,
    homepageEventBlockViewSchema,
    homepageFeaturesBlockViewSchema,
    homepageRulesBlockViewSchema,
    homepageAboutBlockViewSchema,
    homepageLocationBlockViewSchema,
    homepageSocialBlockViewSchema,
  ],
);

export const homepageLayoutViewSchema = z.object({
  blocks: z.array(homepageLayoutBlockViewSchema),
});

export type HomepageHeroBlockView = z.infer<typeof homepageHeroBlockViewSchema>;
export type HomepageTickerBlockView = z.infer<typeof homepageTickerBlockViewSchema>;
export type HomepageEventBlockView = z.infer<typeof homepageEventBlockViewSchema>;
export type HomepageFeaturesBlockView = z.infer<typeof homepageFeaturesBlockViewSchema>;
export type HomepageRulesBlockView = z.infer<typeof homepageRulesBlockViewSchema>;
export type HomepageAboutBlockView = z.infer<typeof homepageAboutBlockViewSchema>;
export type HomepageLocationBlockView = z.infer<typeof homepageLocationBlockViewSchema>;
export type HomepageSocialBlockView = z.infer<typeof homepageSocialBlockViewSchema>;
export type HomepageLayoutBlockView = z.infer<typeof homepageLayoutBlockViewSchema>;
export type HomepageLayoutView = z.infer<typeof homepageLayoutViewSchema>;
