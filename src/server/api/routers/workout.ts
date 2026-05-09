import { z } from "zod";
import type { DailyVolumeProp } from "../../../components/types";

import { createTRPCRouter, protectedProcedure } from "../trpc";

type TrainingStatRow = {
  date: Date;
};

type TopExerciseRow = {
  exerciseId: number;
  name: string;
  count: bigint;
};

type VolumeProp = {
  totalVolume: number
};

export const workoutRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        date: z.string().datetime(),
        weight: z.number().optional(),
        reps: z.number(),
        sets: z.number(),
        note: z.string().max(500),
        exerciseId: z.number(),
        duration: z.number().int().min(1).optional(),
        calories: z.number().min(0).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const workout = await ctx.prisma.workout.create({
        data: {
          userId: ctx.session.user.id,
          date: input.date,
          weight: input.weight ?? null,
          reps: input.reps,
          sets: input.sets,
          note: input.note,
          exerciseId: input.exerciseId,
          duration: input.duration ?? null,
          calories: input.calories ?? null,
          weeklyReportPublished: false
        },
      });
      return workout;
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      note: z.string().max(500)
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.workout.updateMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: {
          note: input.note
        }
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.workout.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id
        }
      })
    }),

  getWorkoutById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workout.findFirstOrThrow({
        where: { id: input.id, userId: ctx.session.user.id },
        include: {
          exercise: {
            select: {
              id: true,
              name: true,
              muscles: {
                include: {
                  muscle: {
                    select: {
                      id: true,
                      name: true
                    }
                  }
                }
              }
            }
          }
        },
      });
    }),

  getUserWorkouts: protectedProcedure.input(
    z.object({
      exerciseId: z.number().optional(),
      date: z.union([
        z.string().datetime().optional(),
        z.object({
          lt: z.string().datetime().optional(),
          lte: z.string().datetime().optional(),
          gt: z.string().datetime().optional(),
          gte: z.string().datetime().optional(),
        })
      ]),
      skip: z.number().optional(),
      take: z.number().optional()
    })
  ).query(({ ctx, input }) => {
    return ctx.prisma.workout.findMany({
      where: {
        userId: ctx.session.user.id,
        exerciseId: input.exerciseId,
        date: input.date
      },
      orderBy: { date: "desc" },
      skip: input.skip || 0,
      take: input.take,
      include: {
        exercise: {
          select: {
            id: true,
            name: true,
            muscles: {
              include: {
                muscle: {
                  select: {
                    id: true,
                    name: true,
                  }
                }
              }
            }
          }
        }
      }
    })
  }),

  getUserWorkoutsCount: protectedProcedure.input(
    z.object({
      exerciseId: z.number().optional(),
      date: z.string().datetime().optional(),
    })
  ).query(({ ctx, input }) => {
    return ctx.prisma.workout.count({
      where: {
        userId: ctx.session.user.id,
        exerciseId: input.exerciseId,
        date: input.date
      },
    })
  }),

  getUserWorkoutVolume: protectedProcedure.input(
    z.object({
      date: z.string().datetime().optional(),
    })).query(({ ctx, input }) => {
      const dateString = input.date?.split("T")[0] || "";
      if (dateString && !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        throw new Error("Invalid date format");
      }
      const volume = ctx.prisma.$queryRaw<VolumeProp[]>`select sum("weight" * "reps" * "sets") "totalVolume" from "Workout" where "userId"=${ctx.session.user.id} and to_char(date,'YYYY-MM-DD')=${dateString} and weight > 0 group by date;`
      return volume;
    }),

  getTrainingStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // 全ワークアウト日（重複排除）を取得して連続日数を計算
    const dates = await ctx.prisma.$queryRaw<TrainingStatRow[]>`
      SELECT DISTINCT date_trunc('day', date) AS date
      FROM "Workout"
      WHERE "userId" = ${userId}
      ORDER BY date DESC
    `;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < dates.length; i++) {
      const d = new Date(dates[i]?.date ?? 0);
      d.setHours(0, 0, 0, 0);
      const expected = new Date(today);
      expected.setDate(today.getDate() - i);
      if (d.getTime() === expected.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    // 今月のトレーニング日数
    const firstOfMonth = new Date();
    firstOfMonth.setDate(1);
    firstOfMonth.setHours(0, 0, 0, 0);
    const workoutsThisMonth = await ctx.prisma.workout.count({
      where: {
        userId,
        date: { gte: firstOfMonth },
      },
    });

    // 総ワークアウト記録数
    const totalWorkouts = await ctx.prisma.workout.count({ where: { userId } });

    // 最も多く記録したエクササイズ（上位3件）
    const topExercises = await ctx.prisma.$queryRaw<TopExerciseRow[]>`
      SELECT w."exerciseId", e.name, COUNT(*) AS count
      FROM "Workout" w
      JOIN "Exercise" e ON e.id = w."exerciseId"
      WHERE w."userId" = ${userId}
      GROUP BY w."exerciseId", e.name
      ORDER BY count DESC
      LIMIT 3
    `;

    return {
      streak,
      workoutsThisMonth,
      totalWorkouts,
      topExercises: topExercises.map(r => ({
        exerciseId: r.exerciseId,
        name: r.name,
        count: Number(r.count),
      })),
    };
  }),

  getUserWorkoutVolumeByExerciseId: protectedProcedure.input(
    z.object({
      exerciseId: z.number(),
      inThisWeek: z.boolean().optional()
    })).query(async ({ ctx, input }) => {
      type MaxProps = {
        max: string;
      };
      const maxDate = await ctx.prisma.$queryRaw<MaxProps[]>`select max("executeDate") from "WeeklyReportMaster"`;
      const dateQuery = new Date(maxDate[0]?.max || '1975-01-01').toISOString().split('T')[0] || '';
      const volume = input.inThisWeek
       ? ctx.prisma.$queryRaw<DailyVolumeProp[]>`select date, sum("weight" * "reps" * "sets") "totalVolume" from "Workout" where "userId"=${ctx.session.user.id} and date >= ${new Date(dateQuery)} and "exerciseId" = ${input.exerciseId} and weight > 0 group by date order by date;`
       : ctx.prisma.$queryRaw<DailyVolumeProp[]>`select date, sum("weight" * "reps" * "sets") "totalVolume" from "Workout" where "userId"=${ctx.session.user.id} and "exerciseId" = ${input.exerciseId} and weight > 0 group by date order by date;`
       return volume;
    })
});
