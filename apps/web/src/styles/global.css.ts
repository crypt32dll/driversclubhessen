import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "./tokens.css";

/** Home page: hero is full-bleed under fixed nav — no top offset on `<main>`. */
export const marketingHome = style({});

globalStyle("main", {
  paddingTop: "5rem",
});

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("html", {
  scrollBehavior: "smooth",
  minHeight: "100%",
});

globalStyle("body", {
  minHeight: "100%",
  background: vars.color.black,
  color: vars.color.white,
  fontFamily: vars.font.body,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  overflowX: "hidden",
});

globalStyle("body::before", {
  content: "''",
  position: "fixed",
  inset: 0,
  background: `repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.08) 2px,
    rgba(0,0,0,0.08) 4px
  )`,
  pointerEvents: "none",
  zIndex: 9999,
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle(".strapi-blocks", {
  lineHeight: 1.65,
  maxWidth: "65ch",
});

globalStyle(".strapi-blocks p", {
  marginBottom: "1rem",
});

globalStyle(".strapi-blocks h1, .strapi-blocks h2, .strapi-blocks h3", {
  fontFamily: vars.font.heading,
  marginTop: "1.25rem",
  marginBottom: "0.5rem",
});

globalStyle(".strapi-blocks ul, .strapi-blocks ol", {
  paddingLeft: "1.25rem",
  marginBottom: "1rem",
});

globalStyle(".strapi-richtext-plain p", {
  marginBottom: "0.75rem",
});
