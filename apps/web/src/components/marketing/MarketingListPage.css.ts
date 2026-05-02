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

/** Separate block (“Vergangene Events”) unter anstehenden Treffen — einheitlicher Abstand. */
export const listingBlock = style({
  marginTop: "2.75rem",
});

export const subsectionTitle = style({
  fontFamily: vars.font.heading,
  fontSize: "clamp(1.35rem, 3vw, 2rem)",
  letterSpacing: "0.04em",
  color: vars.color.white,
  margin: "0 0 1.25rem",
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

const cardShellBase = {
  borderRadius: "8px",
  border: "1px solid rgba(0, 229, 255, 0.2)",
  background: `linear-gradient(145deg, ${vars.color.card} 0%, rgba(12,12,20,0.95) 100%)`,
  transition: "border-color 0.2s, box-shadow 0.2s",
} as const;

/** List card umrahmt Body-Link + optional .ics-Zeile. */
export const eventCardShell = style({
  display: "flex",
  flexDirection: "column",
  ...cardShellBase,
  selectors: {
    "&:hover, &:focus-within": {
      borderColor: vars.color.cyanDark,
      boxShadow: vars.shadow.glowCyan,
    },
  },
});

export const eventCardBody = style({
  display: "block",
  padding: "1.25rem 1.5rem 1rem",
  textDecoration: "none",
  color: "inherit",
});

export const eventCardIcs = style({
  display: "block",
  marginTop: "auto",
  padding: "0.65rem 1.5rem 1rem",
  borderTop: "1px solid rgba(0, 229, 255, 0.15)",
  fontFamily: vars.font.accent,
  fontSize: "0.68rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: vars.color.cyan,
  textDecoration: "none",
  transition: "color 0.15s ease, background 0.15s ease",
  selectors: {
    "&:hover": {
      color: vars.color.white,
      background: "rgba(0,229,255,0.06)",
    },
  },
});

/**Einzelkarte ohne .ics (Vergangenheit) — ganze Fläche wie früher `eventCard`. */
export const eventCard = style({
  display: "block",
  padding: "1.25rem 1.5rem",
  ...cardShellBase,
  textDecoration: "none",
  color: "inherit",
  selectors: {
    "&:hover": {
      borderColor: vars.color.cyanDark,
      boxShadow: vars.shadow.glowCyan,
    },
  },
});

export const eventCardTitleRow = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "baseline",
  gap: "0.5rem",
  margin: "0 0 0.5rem",
});

export const eventCardTitle = style({
  fontFamily: vars.font.heading,
  fontSize: "1.5rem",
  letterSpacing: "0.03em",
  margin: 0,
  color: vars.color.white,
});

export const eventCardBadge = style({
  flexShrink: 0,
  fontFamily: vars.font.accent,
  fontSize: "0.65rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  padding: "0.2rem 0.45rem",
  borderRadius: "4px",
  border: "1px solid rgba(255, 120, 80, 0.45)",
  color: "rgb(255, 160, 130)",
  background: "rgba(40, 18, 12, 0.6)",
});

export const eventCardBadgeMuted = style([
  eventCardBadge,
  {
    border: "1px solid rgba(0, 229, 255, 0.25)",
    color: vars.color.cyan,
    background: "rgba(12, 28, 40, 0.5)",
  },
]);

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
