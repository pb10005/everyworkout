import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "../server/db";

function getClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  return new Anthropic({ apiKey });
}

export const generateAiReview = async () => {
  const dates = await prisma.weeklyReportMaster.findMany({
    where: { isGenerated: true },
    orderBy: { executeDate: "desc" },
    take: 1,
  });

  const latestDate = dates[0]?.executeDate;
  if (!latestDate) return;

  const executeDate = latestDate;
  const dateLt = new Date(executeDate);
  const dateGte = new Date(executeDate);
  dateGte.setDate(dateGte.getDate() - 7);

  const enabledUsers = await prisma.userSettings.findMany({
    where: { aiEnabled: true },
    include: { user: true },
  });

  if (enabledUsers.length === 0) return;

  const weekData = await prisma.workout.findMany({
    select: {
      userId: true,
      date: true,
      exerciseId: true,
      weight: true,
      reps: true,
      sets: true,
    },
    where: {
      date: { gte: dateGte, lt: dateLt },
      userId: { in: enabledUsers.map((s) => s.userId) },
    },
  });

  for (const { user } of enabledUsers) {
    const userWorkouts = weekData.filter((w) => w.userId === user.id);
    if (userWorkouts.length === 0) continue;

    const days = new Set(
      userWorkouts.map((w) => w.date.toISOString().split("T")[0] ?? "")
    ).size;
    const exercises = new Set(userWorkouts.map((w) => w.exerciseId)).size;
    const volume = userWorkouts.reduce(
      (sum, w) => sum + (w.weight ?? 0) * w.reps * w.sets,
      0
    );

    const prompt = `あなたはパーソナルトレーナーです。ユーザーの先週のトレーニングを分析して、日本語で励ますレビューを2〜3文で書いてください。

【ユーザー名】${user.name ?? "トレーニーさん"}
【先週のトレーニング日数】${days}回
【行った種目数】${exercises}種類
【総ボリューム】${volume}kg

以下の点に触れてください：
- 先週の頑張りへの言及
- 改善点または次週へのアドバイス
（100文字以内で簡潔に）`;

    let content: string;
    try {
      const client = getClient();
      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 256,
        system: [
          {
            type: "text",
            text: "あなたは経験豊富なパーソナルトレーナーです。ユーザーの週次トレーニングデータを分析し、日本語で励ましと具体的なアドバイスを含む簡潔なレビューを提供します。",
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: [{ role: "user", content: prompt }],
      });
      const block = message.content[0];
      content = block?.type === "text" ? block.text.trim() : "";
    } catch (err) {
      console.error("[AI] generateAiReview failed for user", user.id, err);
      continue;
    }

    if (!content) continue;

    await prisma.aiReview.upsert({
      where: { userId_executeDate: { userId: user.id, executeDate } },
      update: { content },
      create: { userId: user.id, executeDate, content },
    });
  }
};
