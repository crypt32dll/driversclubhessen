import { cache } from "react";

import { eventService } from "@/lib/services/events";

/** Dedupes Payload read when both `generateMetadata` and the page need the same event. */
export const getCachedEventBySlug = cache((slug: string) =>
  eventService.getEventBySlug(slug),
);
