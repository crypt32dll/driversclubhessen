import { vars } from "@/styles/tokens.css";
import { style } from "@vanilla-extract/css";

/** Below the full-viewport hero: centered media strip. */
export const mediaSection = style({
  position: "relative",
  paddingTop: "3rem",
  paddingBottom: "5rem",
  textAlign: "center",
});

export const mediaHeader = style({
  maxWidth: "42rem",
  margin: "0 auto 2.5rem",
});

export const mediaKicker = style({
  fontFamily: vars.font.accent,
  fontSize: "0.7rem",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: vars.color.purpleLight,
  marginBottom: "0.75rem",
});

export const mediaTitle = style({
  fontFamily: vars.font.heading,
  fontSize: "clamp(2rem, 5vw, 3.25rem)",
  letterSpacing: "0.04em",
  color: vars.color.white,
  lineHeight: 1.05,
  margin: 0,
});

export const mediaLede = style({
  marginTop: "1rem",
  fontFamily: vars.font.body,
  fontSize: "clamp(1rem, 2vw, 1.15rem)",
  color: vars.color.textMuted,
  lineHeight: 1.55,
});

export const mediaGrid = style({
  display: "grid",
  gap: "1.5rem",
  gridTemplateColumns: "1fr",
  maxWidth: "56rem",
  margin: "0 auto",
  textAlign: "left",
  "@media": {
    "(min-width: 720px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
});

export const mediaFigure = style({
  margin: 0,
  borderRadius: "10px",
  overflow: "hidden",
  border: "1px solid rgba(0, 229, 255, 0.18)",
  background: `linear-gradient(145deg, ${vars.color.card} 0%, rgba(12,12,20,0.92) 100%)`,
  boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
});

export const mediaCaption = style({
  padding: "0.85rem 1.1rem",
  fontFamily: vars.font.body,
  fontSize: "0.9rem",
  color: vars.color.textMuted,
});
