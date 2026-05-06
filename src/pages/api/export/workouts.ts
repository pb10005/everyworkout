import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const workouts = await prisma.workout.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
    include: {
      exercise: { select: { name: true } },
    },
  });

  const header = "日付,種目,重量(kg),レップ数,セット数,ボリューム,メモ\n";
  const rows = workouts
    .map((w) => {
      const date = new Date(w.date).toLocaleDateString("ja-JP");
      const name = `"${w.exercise.name.replace(/"/g, '""')}"`;
      const weight = w.weight ?? 0;
      const volume = weight * w.reps * w.sets;
      const note = `"${(w.note ?? "").replace(/"/g, '""')}"`;
      return `${date},${name},${weight},${w.reps},${w.sets},${volume},${note}`;
    })
    .join("\n");

  const csv = "﻿" + header + rows; // BOM for Excel

  const dateStr = new Date().toISOString().split("T")[0] ?? "";
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="workouts_${dateStr}.csv"`);
  return res.status(200).send(csv);
}
