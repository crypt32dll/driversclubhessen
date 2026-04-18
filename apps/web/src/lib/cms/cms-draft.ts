import { draftMode } from "next/headers";

/**
 * True when this request hit `/api/draft` with a valid secret (Live Preview iframe).
 * Draft reads use Payload `draft: true` and bypass `unstable_cache`.
 */
export async function isCmsPreviewRequest(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}
