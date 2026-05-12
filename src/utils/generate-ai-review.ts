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

  // 前週（8〜14日前）のデータ取得用
  const prevWeekGte = new Date(executeDate);
  prevWeekGte.setDate(prevWeekGte.getDate() - 14);

  const enabledUsers = await prisma.userSettings.findMany({
    where: { aiEnabled: true },
    include: { user: true },
  });

  if (enabledUsers.length === 0) return;

  const userIds = enabledUsers.map((s) => s.userId);

  // 今週のワークアウト（種目名・筋肉部位情報込み）
  const weekData = await prisma.workout.findMany({
    select: {
      userId: true,
      date: true,
      exerciseId: true,
      weight: true,
      reps: true,
      sets: true,
      exercise: {
        select: {
          name: true,
          muscles: {
            select: {
              is_main: true,
              muscle: {
                select: {
                  name: true,
                  bodyPart: { select: { name: true } },
                },
              },
            },
          },
        },
      },
    },
    where: {
      date: { gte: dateGte, lt: dateLt },
      userId: { in: userIds },
    },
  });

  // 前週のワークアウト（トレンド比較用）
  const prevWeekData = await prisma.workout.findMany({
    select: {
      userId: true,
      date: true,
      weight: true,
      reps: true,
      sets: true,
    },
    where: {
      date: { gte: prevWeekGte, lt: dateGte },
      userId: { in: userIds },
    },
  });

  const DAY_NAMES = ["日", "月", "火", "水", "木", "金", "土"] as const;

  for (const { user } of enabledUsers) {
    const userWorkouts = weekData.filter((w) => w.userId === user.id);
    if (userWorkouts.length === 0) continue;

    // 今週の基本統計
    const workoutDateSet = new Set(
      userWorkouts.map((w) => w.date.toISOString().split("T")[0] ?? "")
    );
    const days = workoutDateSet.size;
    const exercises = new Set(userWorkouts.map((w) => w.exerciseId)).size;
    const volume = userWorkouts.reduce(
      (sum, w) => sum + (w.weight ?? 0) * w.reps * w.sets,
      0
    );

    // トレーニング曜日パターン
    const workoutDays = [
      ...new Set(userWorkouts.map((w) => DAY_NAMES[w.date.getDay()] ?? "")),
    ].join("・");

    // 種目別ボリューム集計（上位5種目）
    const exerciseVolumes: Record<
      string,
      { name: string; volume: number; sets: number }
    > = {};
    for (const w of userWorkouts) {
      const key = String(w.exerciseId);
      const vol = (w.weight ?? 0) * w.reps * w.sets;
      const entry = exerciseVolumes[key];
      if (!entry) {
        exerciseVolumes[key] = { name: w.exercise.name, volume: vol, sets: w.sets };
      } else {
        entry.volume += vol;
        entry.sets += w.sets;
      }
    }
    const topExercises = Object.values(exerciseVolumes)
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 5);

    // 部位別ボリューム集計（メイン筋肉のみ）
    const bodyPartVolumes: Record<string, number> = {};
    for (const w of userWorkouts) {
      const vol = (w.weight ?? 0) * w.reps * w.sets;
      for (const em of w.exercise.muscles) {
        if (em.is_main) {
          const bpName = em.muscle.bodyPart.name;
          bodyPartVolumes[bpName] = (bodyPartVolumes[bpName] ?? 0) + vol;
        }
      }
    }
    const bodyPartSummary = Object.entries(bodyPartVolumes)
      .sort(([, a], [, b]) => b - a)
      .map(([name, vol]) => `${name}: ${Math.round(vol)}kg`)
      .join("、");

    // 前週比較
    const prevUserWorkouts = prevWeekData.filter((w) => w.userId === user.id);
    const prevDays = new Set(
      prevUserWorkouts.map((w) => w.date.toISOString().split("T")[0] ?? "")
    ).size;
    const prevVolume = prevUserWorkouts.reduce(
      (sum, w) => sum + (w.weight ?? 0) * w.reps * w.sets,
      0
    );

    const volumeDiff =
      prevVolume > 0
        ? `（前週比 ${volume > prevVolume ? "+" : ""}${Math.round(((volume - prevVolume) / prevVolume) * 100)}%）`
        : "";
    const daysDiff =
      prevDays > 0
        ? `（前週比 ${days > prevDays ? "+" : ""}${days - prevDays}回）`
        : "";

    // ユーザーの目標（最新3件）
    const goals = await prisma.goal.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { content: true },
    });

    // 今週の体重データ
    const bodyWeights = await prisma.bodyWeight.findMany({
      where: { userId: user.id, date: { gte: dateGte, lt: dateLt } },
      orderBy: { date: "asc" },
      select: { weight: true },
    });
    const latestBodyWeight = bodyWeights.at(-1);

    // プロンプト組み立て
    const goalSection =
      goals.length > 0
        ? `\n【設定中の目標】\n${goals.map((g, i) => `${i + 1}. ${g.content}`).join("\n")}`
        : "";

    const bodyWeightSection = latestBodyWeight
      ? `\n【今週の体重】${latestBodyWeight.weight}kg`
      : "";

    const prompt = `ユーザーの先週のトレーニングデータを分析し、パーソナルトレーナーとして日本語でフィードバックを書いてください。

【ユーザー名】${user.name ?? "トレーニーさん"}
【トレーニング日数】${days}回${daysDiff}（曜日: ${workoutDays}）
【種目数】${exercises}種類
【総ボリューム】${Math.round(volume)}kg${volumeDiff}${bodyWeightSection}${goalSection}

【主要種目トップ5（ボリューム順）】
${topExercises.map((e) => `・${e.name}: ${Math.round(e.volume)}kg（${e.sets}セット）`).join("\n")}

【部位別ボリューム（メイン筋肉）】
${bodyPartSummary || "データなし"}

以下の観点でフィードバックをお願いします（3〜5文、200文字以内）：
1. 今週の頑張りへの具体的な言及（数値を使って）
2. トレーニングバランスや部位偏りへの気づき
3. 来週に向けた具体的なアドバイス`;

    let content: string;
    try {
      const client = getClient();
      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: [
          {
            type: "text",
            text: "あなたは経験豊富なパーソナルトレーナーです。ユーザーの週次トレーニングデータを詳細に分析し、具体的な数値に基づいた励ましと実践的なアドバイスを日本語で提供します。ユーザーのモチベーションを高め、継続的な改善を促す、温かく専門的なフィードバックを心がけてください。",
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
