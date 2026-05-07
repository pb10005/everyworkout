import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { WorkoutMenuItemProps } from "../../../components/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const calculateEstimated1RM = (weight: number, reps: number) => weight * (1 + reps / 30);

const groupByWeek = (date: Date) => {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - day + 1);
  return d.toISOString().slice(0, 10);
};


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
        const message = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 512,
          messages: [{ role: "user", content: prompt }],
        });
        const block = message.content[0];
        raw = block?.type === "text" ? block.text : "";
      } catch {
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

  getTodayWorkoutRecommendation: protectedProcedure
    .input(z.object({ excludeRecentDays: z.number().min(0).max(14).default(2) }).optional())
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      await assertAiEnabled(userId, ctx.prisma);
      const days = input?.excludeRecentDays ?? 2;

      const [recentWorkouts, goal] = await Promise.all([
        ctx.prisma.workout.findMany({
          where: { userId },
          orderBy: { date: "desc" },
          take: 80,
          select: {
            date: true,
            reps: true,
            sets: true,
            weight: true,
            exercise: {
              select: {
                id: true,
                name: true,
                muscles: { select: { muscle: { select: { bodyPartId: true, bodyPart: { select: { name: true } } } } }, where: { is_main: true }, take: 1 },
              },
            },
          },
        }),
        ctx.prisma.goal.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
      ]);

      const recentThreshold = new Date();
      recentThreshold.setDate(recentThreshold.getDate() - days);
      const excludedBodyPartIds = new Set(
        recentWorkouts
          .filter((w) => w.date >= recentThreshold)
          .map((w) => w.exercise.muscles[0]?.muscle.bodyPartId)
          .filter((v): v is number => typeof v === "number")
      );

      const bodyPartCounts = new Map<number, number>();
      for (const workout of recentWorkouts) {
        const bodyPartId = workout.exercise.muscles[0]?.muscle.bodyPartId;
        if (!bodyPartId) continue;
        bodyPartCounts.set(bodyPartId, (bodyPartCounts.get(bodyPartId) ?? 0) + 1);
      }

      const candidateExercises = await ctx.prisma.exercise.findMany({
        select: {
          id: true,
          name: true,
          muscles: { select: { muscle: { select: { bodyPartId: true, bodyPart: { select: { name: true } } } } }, where: { is_main: true }, take: 1 },
        },
      });

      const sortedCandidates = candidateExercises
        .map((exercise) => {
          const bodyPartId = exercise.muscles[0]?.muscle.bodyPartId;
          const count = bodyPartId ? (bodyPartCounts.get(bodyPartId) ?? 0) : 999;
          const excluded = bodyPartId ? excludedBodyPartIds.has(bodyPartId) : true;
          return { exercise, count, excluded };
        })
        .sort((a, b) => Number(a.excluded) - Number(b.excluded) || a.count - b.count)
        .slice(0, 6)
        .map(({ exercise }) => ({
          exerciseId: exercise.id,
          bodyPartId: exercise.muscles[0]?.muscle.bodyPartId ?? 0,
          exerciseName: exercise.name,
          bodyPartName: exercise.muscles[0]?.muscle.bodyPart.name ?? "不明",
        }));

      const reasons = [
        `直近${days}日で実施した部位を優先的に回避しました。`,
        "最近の実施頻度が低い部位を優先して選定しました。",
        `現在の目標（${goal?.content ?? "未設定"}）を考慮してバランスを取りました。`,
      ];

      return { recommendations: sortedCandidates, reasons };
    }),

  detectPlateau: protectedProcedure
    .input(z.object({ lookbackWeeks: z.number().min(2).max(12).default(6) }).optional())
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      await assertAiEnabled(userId, ctx.prisma);
      const lookbackWeeks = input?.lookbackWeeks ?? 6;
      const since = new Date();
      since.setDate(since.getDate() - lookbackWeeks * 7);

      const workouts = (await ctx.prisma.workout.findMany({
        where: { userId, date: { gte: since }, weight: { not: null } },
        orderBy: { date: "asc" },
        select: { date: true, reps: true, sets: true, weight: true, exercise: { select: { name: true } } },
      })) as Array<{ date: Date; reps: number; sets: number; weight: number | null; exercise: { name: string } }>;

      if (workouts.length < 6) {
        return { isPlateau: false, summary: "分析に十分なデータがありません。", suggestions: ["記録頻度を上げて2〜3週間後に再判定してください。"] };
      }

      const weekly = new Map<string, { e1rmTotal: number; volumeTotal: number; count: number }>();
      for (const w of workouts) {
        if (!w.weight) continue;
        const key = groupByWeek(w.date);
        const item = weekly.get(key) ?? { e1rmTotal: 0, volumeTotal: 0, count: 0 };
        item.e1rmTotal += calculateEstimated1RM(w.weight, w.reps);
        item.volumeTotal += w.weight * w.reps * w.sets;
        item.count += 1;
        weekly.set(key, item);
      }

      const rows = [...weekly.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([week, v]) => ({ week, e1rm: v.e1rmTotal / v.count, volume: v.volumeTotal }));
      if (rows.length < 4) {
        return { isPlateau: false, summary: "週次データが不足しているため停滞判定をスキップしました。", suggestions: ["最低4週間の記録で再確認してください。"] };
      }

      const firstHalf = rows.slice(0, Math.floor(rows.length / 2));
      const secondHalf = rows.slice(Math.floor(rows.length / 2));
      const avg = (arr:number[]) => arr.reduce((a,b)=>a+b,0)/arr.length;
      const e1rmDiff = (avg(secondHalf.map(r=>r.e1rm)) - avg(firstHalf.map(r=>r.e1rm))) / avg(firstHalf.map(r=>r.e1rm));
      const volDiff = (avg(secondHalf.map(r=>r.volume)) - avg(firstHalf.map(r=>r.volume))) / avg(firstHalf.map(r=>r.volume));
      const isPlateau = e1rmDiff < 0.02 && volDiff < 0.05;

      return {
        isPlateau,
        summary: isPlateau ? "直近の推定1RMと総ボリュームの伸びが小さく、停滞傾向です。" : "現時点では明確な停滞は見られません。",
        metrics: { e1rmChangeRatio: Number(e1rmDiff.toFixed(3)), volumeChangeRatio: Number(volDiff.toFixed(3)), weeksAnalyzed: rows.length },
        suggestions: isPlateau
          ? ["次週はボリュームを-30%したデロード週を設定する。", "補助種目を1つ入れ替えて刺激を変更する。", "同部位の実施頻度を週+1回検討する。"]
          : ["現在のプログラムを維持し、2週間後に再判定してください。"],
      };
    }),

  generateGoalProgram: protectedProcedure
    .input(z.object({ goal: z.string().min(3).max(120), weeks: z.number().min(2).max(24), daysPerWeek: z.number().min(2).max(7), equipment: z.string().max(200).optional() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      await assertAiEnabled(userId, ctx.prisma);

      const prompt = `あなたはストレングスコーチです。以下条件で中長期プランをJSONで返してください。
目標:${input.goal}
期間:${input.weeks}週間
週あたり:${input.daysPerWeek}日
器具:${input.equipment ?? "指定なし"}

返却形式:
{"phases":[{"name":"","weeks":"1-4","focus":""}],"weeklyTemplate":[{"day":1,"focus":"","examples":["..."]}],"adjustmentRules":["..."]}`;

      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 700,
        messages: [{ role: "user", content: prompt }],
      });
      const block = message.content[0];
      const raw = block?.type === "text" ? block.text : "{}";
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw) as Record<string, unknown>;

      return { goal: input.goal, weeks: input.weeks, daysPerWeek: input.daysPerWeek, plan: parsed };
    }),


  getUserAiReviews: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.aiReview.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { executeDate: "desc" },
      take: 3,
    });
  }),
});
