"use client";

import type { SiteNavItem } from "@driversclub/shared";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import {
  mobileBackdrop,
  mobileClose,
  mobileNavLink,
  mobileNavList,
  mobileOverlay,
  mobileOverlayVisible,
  mobilePanel,
  mobilePanelHeader,
  mobilePanelTitle,
  nav,
  navBar,
  navLink,
  navLinks,
  navLogo,
  navToggle,
  navToggleLine,
  navToggleLineBotOpen,
  navToggleLineMidOpen,
  navToggleLineTopOpen,
} from "./layout.css";

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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setOpen(false);
    // Intentionally depend on pathname only — close drawer after client-side navigation.
    void pathname;
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      toggleRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  return (
    <>
      <nav className={nav} aria-label="Hauptnavigation">
        <div className={navBar}>
          <Link href="/" className={navLogo} onClick={close}>
            DCH
          </Link>

          <ul className={navLinks}>
            {items.map((link) => {
              const external =
                Boolean(link.external) || isExternalHref(link.href);
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

          <button
            ref={toggleRef}
            type="button"
            className={navToggle}
            aria-expanded={open}
            aria-controls={panelId}
            aria-haspopup="true"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`${navToggleLine} ${open ? navToggleLineTopOpen : ""}`}
            />
            <span
              className={`${navToggleLine} ${open ? navToggleLineMidOpen : ""}`}
            />
            <span
              className={`${navToggleLine} ${open ? navToggleLineBotOpen : ""}`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`${mobileOverlay} ${open ? mobileOverlayVisible : ""}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={mobileBackdrop}
          aria-label="Menü schließen"
          onClick={close}
        />
        <nav
          id={panelId}
          className={mobilePanel}
          aria-label="Mobile Navigation"
        >
          <div className={mobilePanelHeader}>
            <span className={mobilePanelTitle}>Navigation</span>
            <button
              ref={closeBtnRef}
              type="button"
              className={mobileClose}
              aria-label="Schließen"
              onClick={close}
            >
              ×
            </button>
          </div>
          <ul className={mobileNavList}>
            {items.map((link) => {
              const external =
                Boolean(link.external) || isExternalHref(link.href);
              return (
                <li key={`mobile-${link.href}-${link.label}`}>
                  {external ? (
                    <a
                      href={link.href}
                      className={mobileNavLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className={mobileNavLink}
                      onClick={close}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};
