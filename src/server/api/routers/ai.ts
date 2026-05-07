import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { WorkoutMenuItemProps } from "../../../components/types";

function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "AI機能の設定が完了していません。管理者にお問い合わせください。",
    });
  }
  return new Anthropic({ apiKey });
}

async function assertAiEnabled(userId: string, prisma: typeof import("../../../server/db").prisma) {
  const settings = await prisma.userSettings.findUnique({ where: { userId } });
  if (!settings?.aiEnabled) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "AI機能は有効化されていません。管理者にお問い合わせください。",
    });
  }
}

export const aiRouter = createTRPCRouter({
  generateWorkoutMenu: protectedProcedure
    .input(
      z.object({
        title: z.string().max(100).optional(),
        excludeRecentDays: z.number().min(0).max(14).default(2),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      await assertAiEnabled(userId, ctx.prisma);

      const since = new Date();
      since.setDate(since.getDate() - 30);

      const [recentWorkouts, goal, exercises] = await Promise.all([
        ctx.prisma.workout.findMany({
          where: { userId, date: { gte: since } },
          orderBy: { date: "desc" },
          take: 50,
          select: {
            date: true,
            exercise: {
              select: {
                name: true,
                muscles: {
                  select: { muscle: { select: { bodyPart: { select: { name: true } } } } },
                  where: { is_main: true },
                  take: 1,
                },
              },
            },
          },
        }),
        ctx.prisma.goal.findFirst({
          where: { userId },
          orderBy: { createdAt: "desc" },
        }),
        ctx.prisma.exercise.findMany({
          select: {
            id: true,
            name: true,
            muscles: {
              select: { muscle: { select: { bodyPartId: true, bodyPart: { select: { name: true } } } } },
              where: { is_main: true },
              take: 1,
            },
          },
        }),
      ]);

      const recentStr = recentWorkouts
        .slice(0, 20)
        .map((w) => {
          const dateStr = new Date(w.date).toLocaleDateString("ja-JP");
          const bodyPart = w.exercise.muscles[0]?.muscle.bodyPart.name ?? "不明";
          return `${dateStr}: ${w.exercise.name}（${bodyPart}）`;
        })
        .join("\n");

      const exerciseList = exercises
        .map((e) => {
          const bodyPartName = e.muscles[0]?.muscle.bodyPart.name ?? "不明";
          const bodyPartId = e.muscles[0]?.muscle.bodyPartId ?? 0;
          return `exerciseId:${e.id}, name:${e.name}, bodyPart:${bodyPartName}, bodyPartId:${bodyPartId}`;
        })
        .join("\n");

      const prompt = `あなたはパーソナルトレーナーです。以下のユーザー情報を元に、今日のワークアウトメニューを作成してください。

【ユーザーの目標】
${goal?.content ?? "目標未設定"}

【直近のトレーニング履歴（最近30日）】
${recentStr || "記録なし"}

【利用可能な種目一覧】
${exerciseList}

以下のJSON配列のみを返してください（説明文・マークダウン不要）：
[{"exerciseId": 1, "bodyPartId": 2}, ...]

条件：
- 直近${input.excludeRecentDays}日以内に行った部位はなるべく避ける
- 3〜6種目を選ぶ
- 全身バランスの良い構成にする`;

      let raw: string;
      try {
        const client = getAnthropicClient();
        const message = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 512,
          messages: [{ role: "user", content: prompt }],
        });
        const block = message.content[0];
        raw = block?.type === "text" ? block.text : "";
      } catch (err) {
        console.error("[AI] generateWorkoutMenu failed:", err);
        if (err instanceof TRPCError) throw err;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "AI生成に失敗しました。手動でメニューを作成してください。",
        });
      }

      let items: WorkoutMenuItemProps[];
      try {
        const jsonMatch = raw.match(/\[[\s\S]*\]/);
        const jsonStr = jsonMatch ? jsonMatch[0] : raw;
        items = JSON.parse(jsonStr) as WorkoutMenuItemProps[];
        if (!Array.isArray(items)) throw new Error("not array");
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "AIの応答を解析できませんでした。手動でメニューを作成してください。",
        });
      }

      const validExerciseIds = new Set(exercises.map((e) => e.id));
      const validItems = items.filter(
        (item) =>
          typeof item.exerciseId === "number" &&
          typeof item.bodyPartId === "number" &&
          validExerciseIds.has(item.exerciseId)
      );

      if (validItems.length === 0) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "有効な種目が生成されませんでした。手動でメニューを作成してください。",
        });
      }

      return validItems;
    }),

  getUserAiReviews: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.aiReview.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { executeDate: "desc" },
      take: 3,
    });
  }),
});
