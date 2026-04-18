import type { ReactNode } from "react";

/**
 * Remounts the segment subtree on client-side navigations (same parent layout).
 * Helps avoid stale client subtrees interacting badly with RSC streaming and
 * React DevTools instrumentation (e.g. “async info / Suspense boundary” noise).
 */
export default function MarketingTemplate({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
