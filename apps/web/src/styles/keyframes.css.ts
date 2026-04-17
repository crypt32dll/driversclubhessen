import { keyframes } from "@vanilla-extract/css";

export const gridPulse = keyframes({
  from: { opacity: 0.4 },
  to: { opacity: 0.9 },
});

export const fadeSlideDown = keyframes({
  from: { opacity: 0, transform: "translateY(-20px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const tickerAnim = keyframes({
  from: { transform: "translateX(0)" },
  to: { transform: "translateX(-50%)" },
});
