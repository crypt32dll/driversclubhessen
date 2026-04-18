import type { SiteNavItem } from "@driversclub/shared";
import Link from "next/link";
import {
  footer,
  footerCopy,
  footerLink,
  footerLinks,
  footerLogo,
  footerSub,
} from "./layout.css";

const legalLinks = [
  { href: "/legal/impressum", label: "Impressum" },
  { href: "/legal/datenschutz", label: "Datenschutz" },
] as const;

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  );
}

type Props = {
  primaryLinks: readonly SiteNavItem[];
};

export const SiteFooter = ({ primaryLinks }: Props) => {
  return (
    <footer className={footer}>
      <div className={footerLogo}>DriversClub Hessen</div>
      <div className={footerSub}>Est. 2024 · Hessen, Deutschland</div>
      <div className={footerLinks}>
        {primaryLinks.map((link) => {
          const external = Boolean(link.external) || isExternalHref(link.href);
          return external ? (
            <a
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={footerLink}
            >
              {link.label}
            </Link>
          );
        })}
        <a
          href="https://www.instagram.com/driversclubhessen"
          className={footerLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        {legalLinks.map((link) => (
          <Link key={link.href} href={link.href} className={footerLink}>
            {link.label}
          </Link>
        ))}
      </div>
      <p className={footerCopy}>
        © {new Date().getFullYear()} DriversClub Hessen · Leidenschaft verbindet
      </p>
    </footer>
  );
};
