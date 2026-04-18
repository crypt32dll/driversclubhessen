import { gdprService } from "@/lib/services/gdpr";

import { CookieBanner } from "./CookieBanner";

export async function CookieBannerGate() {
  const cfg = await gdprService.getCookieBanner();
  return (
    <CookieBanner
      message={cfg.message}
      acceptLabel={cfg.acceptLabel}
      rejectLabel={cfg.rejectLabel}
    />
  );
}
