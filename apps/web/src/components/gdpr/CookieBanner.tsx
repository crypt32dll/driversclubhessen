"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "dch-cookie-consent";

export type CookieConsentState = "accepted" | "rejected" | null;

type Props = {
  message?: string;
  acceptLabel?: string;
  rejectLabel?: string;
};

const DEFAULT_MESSAGE =
  "Wir verwenden nur technisch notwendige Cookies. Optionale Cookies werden erst nach deiner Einwilligung aktiviert.";

export const CookieBanner = ({
  message = DEFAULT_MESSAGE,
  acceptLabel = "Alle akzeptieren",
  rejectLabel = "Nur notwendige",
}: Props) => {
  const [consent, setConsent] = useState<CookieConsentState>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(
      CONSENT_KEY,
    ) as CookieConsentState;
    setConsent(saved ?? null);
    setHydrated(true);
  }, []);

  const persist = (value: Exclude<CookieConsentState, null>) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  if (!hydrated || consent) {
    return null;
  }

  return (
    <aside
      style={{
        position: "fixed",
        left: "1rem",
        right: "1rem",
        bottom: "1rem",
        border: "1px solid rgba(0,229,255,0.4)",
        background: "rgba(6,6,10,0.96)",
        backdropFilter: "blur(10px)",
        borderRadius: "8px",
        padding: "1rem",
        zIndex: 1200,
      }}
    >
      <p>
        Wir verwenden nur technisch notwendige Cookies. Optionale Cookies werden
        erst nach deiner Einwilligung aktiviert.
      </p>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginTop: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <button type="button" onClick={() => persist("accepted")}>
          {acceptLabel}
        </button>
        <button type="button" onClick={() => persist("rejected")}>
          {rejectLabel}
        </button>
      </div>
    </aside>
  );
};
