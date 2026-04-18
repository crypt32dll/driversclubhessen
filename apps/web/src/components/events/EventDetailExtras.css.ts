import { vars } from "@/styles/tokens.css";
import { style } from "@vanilla-extract/css";

export const extrasSection = style({
  position: "relative",
  paddingTop: "2.5rem",
  paddingBottom: "2rem",
  borderTop: "1px solid rgba(0, 229, 255, 0.12)",
});

export const sectionInner = style({
  maxWidth: "42rem",
  margin: "0 auto",
});

export const sectionHeader = style({
  textAlign: "center",
  marginBottom: "2rem",
});

export const sectionKicker = style({
  fontFamily: vars.font.accent,
  fontSize: "0.7rem",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: vars.color.purpleLight,
  marginBottom: "0.75rem",
});

export const sectionTitle = style({
  fontFamily: vars.font.heading,
  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
  letterSpacing: "0.04em",
  color: vars.color.white,
  lineHeight: 1.1,
  margin: 0,
});

export const sectionLede = style({
  marginTop: "1rem",
  fontFamily: vars.font.body,
  fontSize: "clamp(1rem, 2vw, 1.1rem)",
  color: vars.color.textMuted,
  lineHeight: 1.55,
});

export const calBar = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "0.75rem 1rem",
  marginBottom: "2rem",
  padding: "1rem 1.25rem",
  borderRadius: "10px",
  border: "1px solid rgba(0, 229, 255, 0.18)",
  background: `linear-gradient(145deg, ${vars.color.card} 0%, rgba(12,12,20,0.92) 100%)`,
});

export const calBarTitle = style({
  fontFamily: vars.font.accent,
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: vars.color.purpleLight,
  margin: 0,
  width: "100%",
  "@media": {
    "(min-width: 520px)": {
      width: "auto",
    },
  },
});

export const calBarLink = style({
  fontFamily: vars.font.body,
  fontSize: "0.95rem",
  color: vars.color.white,
  textDecoration: "underline",
  textUnderlineOffset: "0.15em",
  ":hover": {
    color: vars.color.purpleLight,
  },
});

export const listTitle = style({
  fontFamily: vars.font.heading,
  fontSize: "1.25rem",
  color: vars.color.white,
  marginTop: 0,
  marginBottom: "0.75rem",
});

export const listUl = style({
  margin: "0 0 2rem",
  paddingLeft: "1.25rem",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  lineHeight: 1.55,
});

export const listCheck = style({
  marginBottom: "0.35rem",
});

export const faqList = style({
  margin: 0,
});

export const faqItem = style({
  marginBottom: "1.5rem",
});

export const faqQuestion = style({
  fontFamily: vars.font.heading,
  fontSize: "1.05rem",
  color: vars.color.white,
  margin: 0,
});

export const faqAnswer = style({
  margin: "0.4rem 0 0",
  fontFamily: vars.font.body,
  fontSize: "1rem",
  color: vars.color.textMuted,
  lineHeight: 1.55,
});
