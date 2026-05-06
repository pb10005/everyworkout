import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (
    !process.env.CRON_SECRET ||
    req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const body = req.body as unknown;
  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as Record<string, unknown>).userId !== "string" ||
    typeof (body as Record<string, unknown>).enabled !== "boolean"
  ) {
    return res.status(400).json({ error: "Invalid body: userId (string) and enabled (boolean) are required" });
  }

  const { userId, enabled } = body as { userId: string; enabled: boolean };

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const settings = await prisma.userSettings.upsert({
    where: { userId },
    update: { aiEnabled: enabled },
    create: { userId, aiEnabled: enabled },
  });

  return res.status(200).json({ userId, aiEnabled: settings.aiEnabled });
}
