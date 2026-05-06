export const dynamic = "force-dynamic";
import { generateAiReview } from "../../../utils/generate-ai-review";

export async function GET(request: Request) {
  if (
    process.env.CRON_SECRET &&
    request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }
  await generateAiReview();
  return new Response("success", { status: 200 });
}
