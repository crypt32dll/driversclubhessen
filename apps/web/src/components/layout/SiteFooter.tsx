import Link from "next/link";
import {
  footer,
  footerCopy,
  footerLink,
  footerLinks,
  footerLogo,
  footerSub,
} from "./layout.css";

const anchorLinks = [
  { href: "/#event", label: "Event" },
  { href: "/#about", label: "Über uns" },
  { href: "/#location", label: "Anfahrt" },
  { href: "/#social", label: "Social" },
] as const;

export const SiteFooter = () => {
  return (
    <footer className={footer}>
      <div className={footerLogo}>DriversClub Hessen</div>
      <div className={footerSub}>Est. 2024 · Hessen, Deutschland</div>
      <div className={footerLinks}>
        {anchorLinks.map((link) => (
          <Link key={link.href} href={link.href} className={footerLink}>
            {link.label}
          </Link>
        ))}
        <Link href="/events" className={footerLink}>
          Events
        </Link>
        <Link href="/gallery" className={footerLink}>
          Gallery
        </Link>
        <a
          href="https://www.instagram.com/driversclubhessen"
          className={footerLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <Link href="/legal/impressum" className={footerLink}>
          Impressum
        </Link>
        <Link href="/legal/datenschutz" className={footerLink}>
          Datenschutz
        </Link>
      </div>
      <p className={footerCopy}>
        © {new Date().getFullYear()} DriversClub Hessen · Leidenschaft verbindet
      </p>
    </footer>
  );
};
