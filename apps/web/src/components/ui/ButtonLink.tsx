import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";
import { buttonOutline, buttonPrimary } from "./ui.css";

type Variant = "primary" | "outline";

type Props = PropsWithChildren<
  LinkProps & {
    variant?: Variant;
    className?: string;
  }
>;

export const ButtonLink = ({
  children,
  variant = "primary",
  className,
  ...props
}: Props) => {
  const buttonClass = variant === "primary" ? buttonPrimary : buttonOutline;
  return (
    <Link {...props} className={`${buttonClass} ${className ?? ""}`.trim()}>
      {children}
    </Link>
  );
};
