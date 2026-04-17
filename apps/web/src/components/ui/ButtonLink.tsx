import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { buttonOutline, buttonPrimary } from "./ui.css";

type Variant = "primary" | "outline";

type Props = PropsWithChildren<
  LinkProps &
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> & {
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
