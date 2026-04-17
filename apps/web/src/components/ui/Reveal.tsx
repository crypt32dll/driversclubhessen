"use client";

import { useIntersectionReveal } from "@/hooks/useIntersectionReveal";
import type { PropsWithChildren } from "react";
import { revealBase, revealVisible } from "./ui.css";

type Props = PropsWithChildren<{ className?: string }>;

export const Reveal = ({ children, className }: Props) => {
  const { ref, visible } = useIntersectionReveal();
  return (
    <div
      ref={ref}
      className={`${revealBase} ${visible ? revealVisible : ""} ${
        className ?? ""
      }`.trim()}
    >
      {children}
    </div>
  );
};
