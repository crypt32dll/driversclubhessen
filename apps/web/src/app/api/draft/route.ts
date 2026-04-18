import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Enables Next.js Draft Mode after validating `PAYLOAD_PREVIEW_SECRET`.
 * Used as the Live Preview entry URL from Payload admin (`admin.livePreview`).
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const redirect = request.nextUrl.searchParams.get("redirect") ?? "/";

  if (secret !== process.env.PAYLOAD_PREVIEW_SECRET) {
    return new NextResponse("Invalid preview secret", { status: 401 });
  }

  if (!redirect.startsWith("/")) {
    return new NextResponse("Invalid redirect path", { status: 400 });
  }

  (await draftMode()).enable();

  return NextResponse.redirect(new URL(redirect, request.nextUrl.origin));
}
