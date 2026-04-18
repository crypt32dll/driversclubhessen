import { vars } from "@/styles/tokens.css";
import { style } from "@vanilla-extract/css";

export const main = style({
  paddingTop: "4rem",
  paddingBottom: "5rem",
  minHeight: "60vh",
  fontFamily: vars.font.body,
});

export const intro = style({
  marginBottom: "2.5rem",
  maxWidth: "48rem",
});

export const kicker = style({
  fontFamily: vars.font.accent,
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: vars.color.cyan,
  marginBottom: "0.5rem",
});

export const title = style({
  fontFamily: vars.font.heading,
  fontSize: "clamp(2rem, 5vw, 3rem)",
  letterSpacing: "0.04em",
  color: vars.color.white,
  margin: 0,
});

export const lede = style({
  marginTop: "0.75rem",
  color: vars.color.textMuted,
  fontSize: "1.05rem",
  lineHeight: 1.55,
});

export const section = style({
  marginBottom: "2.5rem",
  maxWidth: "48rem",
});

export const sectionTitle = style({
  fontFamily: vars.font.heading,
  fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
  letterSpacing: "0.03em",
  color: vars.color.white,
  margin: "0 0 1rem",
});

export const subTitle = style({
  fontFamily: vars.font.heading,
  fontSize: "1.15rem",
  color: vars.color.purpleLight,
  margin: "1.25rem 0 0.65rem",
});

export const p = style({
  margin: "0 0 1rem",
  color: vars.color.textMuted,
  lineHeight: 1.6,
  fontSize: "1.02rem",
});

export const list = style({
  margin: "0 0 1rem",
  paddingLeft: "1.35rem",
  color: vars.color.textMuted,
  lineHeight: 1.6,
});

export const listItem = style({
  marginBottom: "0.5rem",
});

export const link = style({
  color: vars.color.cyan,
  textDecoration: "underline",
  textUnderlineOffset: "0.15em",
  ":hover": {
    color: vars.color.purpleLight,
  },
});

export const highlightBox = style({
  marginTop: "1rem",
  padding: "1rem 1.25rem",
  borderRadius: "8px",
  border: "1px solid rgba(0, 229, 255, 0.2)",
  background: `linear-gradient(145deg, ${vars.color.card} 0%, rgba(12,12,20,0.95) 100%)`,
});
