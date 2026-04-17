import type { PropsWithChildren } from "react";
import { container } from "./ui.css";

export const Container = ({ children }: PropsWithChildren) => {
  return <div className={container}>{children}</div>;
};
