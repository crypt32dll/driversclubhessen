import { initBotId } from "botid/client/core";

/**
 * BotID (Vercel): client-side challenge for routes verified with `checkBotId()` on the server.
 * @see https://vercel.com/docs/botid/get-started
 *
 * Do not list server-only webhook routes (e.g. `POST /api/revalidate`) — they are not
 * browser sessions and would fail verification.
 */
initBotId({
  protect: [
    /** Payload CMS GraphQL API (admin UI + same-origin clients). */
    { path: "/api/graphql", method: "POST" },
  ],
});
