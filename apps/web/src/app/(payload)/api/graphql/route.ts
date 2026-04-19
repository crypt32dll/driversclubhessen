import config from "@payload-config";
import { GRAPHQL_POST } from "@payloadcms/next/routes";
import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";

const payloadGraphqlPost = GRAPHQL_POST(config);

export async function POST(request: Request) {
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json(
      { errors: [{ message: "Forbidden" }] },
      { status: 403 },
    );
  }
  return payloadGraphqlPost(request);
}
