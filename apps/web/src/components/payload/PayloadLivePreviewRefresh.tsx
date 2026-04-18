"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Server-side Live Preview: on Payload document save / autosave, refresh the
 * RSC tree so the page re-fetches with `draft: true` (see `isCmsPreviewRequest`).
 *
 * @see https://payloadcms.com/docs/live-preview/server
 */
export function PayloadLivePreviewRefresh() {
  const router = useRouter();
  const [serverURL, setServerURL] = useState<string | null>(null);

  useEffect(() => {
    setServerURL(window.location.origin);
  }, []);

  if (!serverURL) return null;

  return (
    <RefreshRouteOnSave
      refresh={() => {
        router.refresh();
      }}
      serverURL={serverURL}
    />
  );
}
