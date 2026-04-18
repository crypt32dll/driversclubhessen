import type { SiteNavItem } from "@driversclub/shared";
import Link from "next/link";
import { nav, navLink, navLinks, navLogo } from "./layout.css";

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  );
}

type Props = {
  items: readonly SiteNavItem[];
};

export const SiteNav = ({ items }: Props) => {
  return (
    <nav className={nav}>
      <Link href="/" className={navLogo}>
        DCH
      </Link>
      <ul className={navLinks}>
        {items.map((link) => {
          const external = Boolean(link.external) || isExternalHref(link.href);
          return (
            <li key={`${link.href}-${link.label}`}>
              {external ? (
                <a
                  href={link.href}
                  className={navLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className={navLink}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
