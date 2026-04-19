"use client";

import { useCallback, useState } from "react";

import { fabButton, fabIcon, fabToast, fabWrap } from "./EventShareButton.css";

export { eventDetailMainWithFab } from "./EventShareButton.css";

type Props = {
  title: string;
  url: string;
};

function ShareIcon() {
  return (
    <svg
      className={fabIcon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable={false}
    >
      <title>Teilen</title>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <line
        x1="8.59"
        y1="13.51"
        x2="15.42"
        y2="17.49"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="15.41"
        y1="6.51"
        x2="8.59"
        y2="10.49"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EventShareButton({ title, url }: Props) {
  const [hint, setHint] = useState<string | null>(null);

  const onShare = useCallback(async () => {
    setHint(null);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: title, url });
        return;
      } catch {
        /* user cancelled or share failed */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setHint("Link kopiert");
      window.setTimeout(() => setHint(null), 2500);
    } catch {
      setHint("Link manuell kopieren");
      window.setTimeout(() => setHint(null), 3500);
    }
  }, [title, url]);

  return (
    <div className={fabWrap}>
      {hint ? (
        <output className={fabToast} aria-live="polite">
          {hint}
        </output>
      ) : null}
      <button
        type="button"
        className={fabButton}
        onClick={onShare}
        aria-label="Event teilen"
      >
        <ShareIcon />
      </button>
    </div>
  );
}
