/**
 * Runs once per server process (Node runtime). Useful for deployment diagnostics on Vercel.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { logger } = await import("@/lib/logger");
  logger.info("Next.js server process started", {
    vercel: process.env.VERCEL ?? "0",
    vercelEnv: process.env.VERCEL_ENV ?? "",
    nodeEnv: process.env.NODE_ENV ?? "",
  });
}
