import type { ReactNode } from "react";

/**
 * Intentionally **does not** render `<html>` / `<body>` here.
 * Next.js supports **multiple root layouts** via route groups: see `(marketing)/layout.tsx` and
 * `(payload)/layout.tsx`. A top-level `<html>` would wrap Payload admin and cause nested `<html>`
 * hydration errors.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/route-groups#creating-multiple-root-layouts
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
