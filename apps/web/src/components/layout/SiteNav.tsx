import Link from "next/link";
import { nav, navLink, navLinks, navLogo } from "./layout.css";

const links = [
  { href: "/#event", label: "Event" },
  { href: "/#about", label: "Über uns" },
  { href: "/#location", label: "Anfahrt" },
  { href: "/#social", label: "Social" },
] as const;

export const SiteNav = () => {
  return (
    <nav className={nav}>
      <Link href="/" className={navLogo}>
        DCH
      </Link>
      <ul className={navLinks}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={navLink}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
