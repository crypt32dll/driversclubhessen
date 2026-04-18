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
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  letterSpacing: "0.04em",
  color: vars.color.white,
  margin: 0,
});

export const lede = style({
  marginTop: "0.75rem",
  color: vars.color.textMuted,
  fontSize: "1.05rem",
  maxWidth: "38rem",
  lineHeight: 1.5,
});

export const eventGrid = style({
  display: "grid",
  gap: "1.25rem",
  gridTemplateColumns: "1fr",
  "@media": {
    "(min-width: 520px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "(min-width: 900px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
});

export const eventCard = style({
  display: "block",
  padding: "1.25rem 1.5rem",
  borderRadius: "8px",
  border: "1px solid rgba(0, 229, 255, 0.2)",
  background: `linear-gradient(145deg, ${vars.color.card} 0%, rgba(12,12,20,0.95) 100%)`,
  textDecoration: "none",
  color: "inherit",
  transition: "border-color 0.2s, box-shadow 0.2s",
  selectors: {
    "&:hover": {
      borderColor: vars.color.cyanDark,
      boxShadow: vars.shadow.glowCyan,
    },
  },
});

export const eventCardTitle = style({
  fontFamily: vars.font.heading,
  fontSize: "1.5rem",
  letterSpacing: "0.03em",
  margin: "0 0 0.5rem",
  color: vars.color.white,
});

export const eventCardMeta = style({
  fontSize: "0.95rem",
  color: vars.color.textMuted,
  margin: "0 0 0.35rem",
});

export const galleryGrid = style({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
});

export const galleryFigure = style({
  margin: 0,
});

export const galleryCaption = style({
  marginTop: "0.5rem",
  fontSize: "0.9rem",
  color: vars.color.textMuted,
});
