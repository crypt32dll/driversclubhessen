import { fadeSlideDown, gridPulse } from "@/styles/keyframes.css";
import { vars } from "@/styles/tokens.css";
import { style } from "@vanilla-extract/css";

/** Vertical rhythm; horizontal inset comes from `Container` (matches original section + .container). */
export const section = style({
  paddingTop: vars.spacing.sectionY,
  paddingBottom: vars.spacing.sectionY,
});

/* ── HERO ── */
export const hero = style({
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "2rem 1rem 4rem",
  overflow: "hidden",
});

/** CMS hero photo — behind gradients (`heroBg` z-index 0). */
export const heroBackdropPhoto = style({
  position: "absolute",
  inset: 0,
  zIndex: -1,
  pointerEvents: "none",
});

export const heroBackdropImage = style({
  objectFit: "cover",
  objectPosition: "center",
  opacity: 0.35,
});

export const heroBg = style({
  position: "absolute",
  inset: 0,
  background: `
    radial-gradient(ellipse 80% 60% at 50% 120%, rgba(139,47,201,0.35) 0%, transparent 65%),
    radial-gradient(ellipse 50% 40% at 20% 30%, rgba(0,229,255,0.12) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 80% 20%, rgba(139,47,201,0.18) 0%, transparent 60%),
    linear-gradient(180deg, #06060a 0%, #0c0c18 100%)
  `,
  zIndex: 0,
});

export const heroGrid = style({
  position: "absolute",
  inset: 0,
  backgroundImage: `
    linear-gradient(rgba(0,229,255,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,229,255,0.06) 1px, transparent 1px)
  `,
  backgroundSize: "60px 60px",
  transform: "perspective(600px) rotateX(30deg) scale(1.4)",
  transformOrigin: "bottom center",
  animation: `${gridPulse} 4s ease-in-out infinite alternate`,
  zIndex: 1,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 0.65,
    },
  },
});

export const heroContent = style({
  position: "relative",
  zIndex: 2,
  maxWidth: "900px",
});

export const badge = style({
  display: "inline-block",
  fontFamily: vars.font.accent,
  fontSize: "0.7rem",
  letterSpacing: "0.25em",
  color: vars.color.cyan,
  border: `1px solid ${vars.color.cyanDark}`,
  padding: "0.35rem 1.2rem",
  borderRadius: "2px",
  marginBottom: "1.5rem",
  textTransform: "uppercase",
  animation: `${fadeSlideDown} 0.8s ease both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 1,
    },
  },
});

export const heroEyebrow = style({
  fontFamily: vars.font.body,
  fontSize: "clamp(1rem, 2vw, 1.3rem)",
  fontWeight: 600,
  letterSpacing: "0.3em",
  color: vars.color.purpleLight,
  textTransform: "uppercase",
  marginBottom: "0.5rem",
  animation: `${fadeSlideDown} 0.9s ease both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 1,
    },
  },
});

export const heroTitle = style({
  fontFamily: vars.font.heading,
  fontSize: "clamp(4rem, 14vw, 11rem)",
  lineHeight: 0.88,
  letterSpacing: "0.04em",
  marginBottom: "0.2rem",
  animation: `${fadeSlideDown} 1s ease both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 1,
    },
  },
});

export const heroTitleLine1 = style({
  display: "block",
  background: `linear-gradient(135deg, ${vars.color.purpleLight} 0%, ${vars.color.cyan} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  filter: "drop-shadow(0 0 20px rgba(180,79,255,0.5))",
});

export const heroTitleLine2 = style({
  display: "block",
  color: vars.color.white,
  textShadow: "0 0 40px rgba(0,229,255,0.3)",
});

export const heroSub = style({
  fontFamily: vars.font.accent,
  fontSize: "clamp(1rem, 3vw, 1.8rem)",
  color: vars.color.cyan,
  letterSpacing: "0.12em",
  margin: "1.2rem 0 2rem",
  textShadow: vars.shadow.glowCyan,
  animation: `${fadeSlideDown} 1.1s ease both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 1,
    },
  },
});

export const countdown = style({
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  marginBottom: "2.5rem",
  flexWrap: "wrap",
  animation: `${fadeSlideDown} 1.2s ease both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 1,
    },
  },
});

export const cdBlock = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,229,255,0.2)",
  borderRadius: "4px",
  padding: "0.8rem 1.2rem",
  minWidth: "80px",
  backdropFilter: "blur(8px)",
  position: "relative",
  overflow: "hidden",
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "2px",
      background: `linear-gradient(90deg, ${vars.color.purple}, ${vars.color.cyan})`,
    },
  },
});

export const cdNum = style({
  fontFamily: vars.font.accent,
  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
  fontWeight: 900,
  color: vars.color.cyan,
  lineHeight: 1,
  textShadow: vars.shadow.glowCyan,
});

export const cdLabel = style({
  fontFamily: vars.font.body,
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  color: "rgba(255,255,255,0.5)",
  textTransform: "uppercase",
  marginTop: "0.3rem",
});

export const heroCtas = style({
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  flexWrap: "wrap",
  animation: `${fadeSlideDown} 1.3s ease both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 1,
    },
  },
});

export const estTag = style({
  fontFamily: vars.font.accent,
  fontSize: "0.55rem",
  letterSpacing: "0.25em",
  color: "rgba(255,255,255,0.55)",
  textTransform: "uppercase",
  marginTop: "1.25rem",
});

/* Section titles (original `.section-label`, `.section-title`) */
export const sectionLabel = style({
  fontFamily: vars.font.accent,
  fontSize: "0.65rem",
  letterSpacing: "0.35em",
  color: vars.color.purpleLight,
  textTransform: "uppercase",
  marginBottom: "0.5rem",
});

export const sectionTitle = style({
  fontFamily: vars.font.heading,
  fontSize: "clamp(2.5rem, 6vw, 5rem)",
  lineHeight: 1,
  letterSpacing: "0.05em",
});

export const sectionTitleAccent = style({
  color: vars.color.cyan,
});

/** Strapi `homepage.section-item` dynamic zone blocks */
export const cmsSection = style({
  marginBottom: "3rem",
  ":last-child": {
    marginBottom: 0,
  },
});

export const cmsSectionTitle = style({
  fontFamily: vars.font.heading,
  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
  marginBottom: "1rem",
  letterSpacing: "0.04em",
});

export const cmsSectionBody = style({
  fontFamily: vars.font.body,
  fontSize: "1rem",
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.75)",
  whiteSpace: "pre-wrap",
});

export const divider = style({
  width: "100%",
  height: "1px",
  background: `linear-gradient(90deg, transparent, ${vars.color.purple}, ${vars.color.cyan}, transparent)`,
  opacity: 0.4,
});

/* Event / upcoming */
export const eventSection = style([
  section,
  {
    background: vars.color.dark,
  },
]);

export const eventGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "2rem",
  marginTop: "3rem",
  "@media": {
    "(max-width: 700px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const eventCard = style({
  background: vars.color.card,
  border: "1px solid rgba(139,47,201,0.25)",
  borderRadius: "4px",
  padding: "2rem",
  position: "relative",
  overflow: "hidden",
  transition: "border-color 0.3s, transform 0.3s",
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "3px",
      height: "100%",
      background: `linear-gradient(180deg, ${vars.color.purple}, ${vars.color.cyan})`,
    },
  },
  ":hover": {
    borderColor: "rgba(0,229,255,0.4)",
    transform: "translateY(-3px)",
  },
});

export const eventCardIcon = style({
  fontSize: "2rem",
  marginBottom: "0.75rem",
});

export const eventCardTitle = style({
  fontFamily: vars.font.accent,
  fontSize: "0.7rem",
  letterSpacing: "0.2em",
  color: vars.color.purpleLight,
  textTransform: "uppercase",
  marginBottom: "0.5rem",
});

export const eventCardValue = style({
  fontFamily: vars.font.heading,
  fontSize: "1.8rem",
  letterSpacing: "0.05em",
  color: vars.color.white,
});

export const eventCardSub = style({
  fontSize: "0.95rem",
  color: "rgba(255,255,255,0.55)",
  marginTop: "0.25rem",
  lineHeight: 1.4,
});

/* Features */
export const featuresSection = style([
  section,
  {
    background: vars.color.black,
  },
]);

export const featuresGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "1.5rem",
  marginTop: "3rem",
});

export const feature = style({
  padding: "1.8rem",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "4px",
  transition: "all 0.3s",
  selectors: {
    "&:hover": {
      background: "rgba(139,47,201,0.08)",
      borderColor: "rgba(139,47,201,0.3)",
      transform: "translateY(-2px)",
    },
  },
});

export const featureIcon = style({
  fontSize: "1.8rem",
  marginBottom: "1rem",
});

export const featureTitle = style({
  fontFamily: vars.font.accent,
  fontSize: "0.8rem",
  letterSpacing: "0.1em",
  color: vars.color.cyan,
  marginBottom: "0.5rem",
});

export const featureText = style({
  fontSize: "0.95rem",
  color: "rgba(255,255,255,0.6)",
  lineHeight: 1.6,
});

/* Rules */
export const rulesSection = style([
  section,
  {
    background: vars.color.dark,
  },
]);

export const rulesGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
  marginTop: "3rem",
  "@media": {
    "(max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const rule = style({
  display: "flex",
  alignItems: "flex-start",
  gap: "1rem",
  padding: "1.2rem 1.5rem",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "4px",
});

export const ruleIcon = style({
  fontSize: "1.3rem",
  flexShrink: 0,
  marginTop: "0.1rem",
});

export const ruleText = style({
  fontSize: "0.95rem",
  color: "rgba(255,255,255,0.7)",
  lineHeight: 1.5,
});

/* Collab */
export const collabSection = style([
  section,
  {
    background: vars.color.black,
    textAlign: "center",
  },
]);

export const collabLogos = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "3rem",
  margin: "3rem 0",
  flexWrap: "wrap",
});

export const collabLogoBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.8rem",
});

export const logoCircle = style({
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  border: "2px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: vars.font.heading,
  fontSize: "0.9rem",
  textAlign: "center",
  lineHeight: 1.2,
  padding: "1rem",
  transition: "all 0.3s",
  selectors: {
    "&:hover": {
      transform: "scale(1.08)",
    },
  },
});

export const logoCirclePurple = style({
  borderColor: vars.color.purple,
  color: vars.color.purpleLight,
  boxShadow: "0 0 20px rgba(139,47,201,0.3)",
  background: "rgba(139,47,201,0.08)",
});

export const logoCircleCyan = style({
  borderColor: vars.color.cyan,
  color: vars.color.cyan,
  boxShadow: "0 0 20px rgba(0,229,255,0.2)",
  background: "rgba(0,229,255,0.05)",
});

export const collabX = style({
  fontFamily: vars.font.heading,
  fontSize: "3rem",
  background: `linear-gradient(135deg, ${vars.color.purpleLight}, ${vars.color.cyan})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
});

export const logoName = style({
  fontFamily: vars.font.accent,
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  color: "rgba(255,255,255,0.5)",
  textTransform: "uppercase",
});

export const collabDesc = style({
  maxWidth: "650px",
  margin: "0 auto",
  fontSize: "1.05rem",
  color: "rgba(255,255,255,0.6)",
  lineHeight: 1.7,
});

/* Location */
export const locationSection = style([
  section,
  {
    background: vars.color.black,
  },
]);

export const locationContent = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "3rem",
  marginTop: "3rem",
  alignItems: "center",
  "@media": {
    "(max-width: 700px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const locationInfo = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const locationDetail = style({
  display: "flex",
  alignItems: "flex-start",
  gap: "1rem",
});

export const locIcon = style({
  width: "40px",
  height: "40px",
  borderRadius: "3px",
  background: "rgba(139,47,201,0.15)",
  border: "1px solid rgba(139,47,201,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.1rem",
  flexShrink: 0,
});

export const locLabel = style({
  fontFamily: vars.font.accent,
  fontSize: "0.62rem",
  letterSpacing: "0.2em",
  color: vars.color.purpleLight,
  textTransform: "uppercase",
});

export const locValue = style({
  fontSize: "1rem",
  color: vars.color.white,
  marginTop: "0.2rem",
  lineHeight: 1.4,
});

export const mapPlaceholder = style({
  aspectRatio: "1 / 0.8",
  background: vars.color.card,
  border: "1px solid rgba(0,229,255,0.2)",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  color: "rgba(255,255,255,0.4)",
  fontFamily: vars.font.accent,
  fontSize: "0.7rem",
  letterSpacing: "0.15em",
  textDecoration: "none",
  transition: "all 0.3s",
  position: "relative",
  overflow: "hidden",
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      background: `
        linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "30px 30px",
    },
    "&:hover": {
      borderColor: vars.color.cyan,
      boxShadow: vars.shadow.glowCyan,
      color: vars.color.cyan,
    },
  },
});

export const mapCtaInline = style({
  marginTop: "0.5rem",
  display: "inline-block",
});

export const mapPin = style({
  fontSize: "3rem",
});

export const mapHint = style({
  fontSize: "0.55rem",
  opacity: 0.5,
  marginTop: "0.5rem",
});

/* Social */
export const socialSection = style([
  section,
  {
    background: vars.color.dark,
    textAlign: "center",
  },
]);

export const socialIntro = style({
  marginTop: "1rem",
  color: "rgba(255,255,255,0.5)",
  fontSize: "0.95rem",
  maxWidth: "500px",
  marginLeft: "auto",
  marginRight: "auto",
});

export const socialLinks = style({
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  flexWrap: "wrap",
  marginTop: "2.5rem",
});

export const socialBtn = style({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  padding: "0.85rem 1.8rem",
  border: "1px solid rgba(139,47,201,0.4)",
  borderRadius: "3px",
  textDecoration: "none",
  color: vars.color.white,
  fontFamily: vars.font.accent,
  fontSize: "0.7rem",
  letterSpacing: "0.12em",
  transition: "all 0.3s",
  background: "rgba(255,255,255,0.02)",
  selectors: {
    "&:hover": {
      borderColor: vars.color.purpleLight,
      background: "rgba(139,47,201,0.12)",
      transform: "translateY(-2px)",
      boxShadow: vars.shadow.glowPurple,
    },
  },
});
