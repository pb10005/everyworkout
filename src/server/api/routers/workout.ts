import { z } from "zod";
import type { DailyVolumeProp } from "../../../components/types";

import { createTRPCRouter, protectedProcedure } from "../trpc";

type VolumeProp = {
  totalVolume: number
};

export const workoutRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        date: z.string().datetime(),
        weight: z.number(),
        reps: z.number(),
        sets: z.number(),
        note: z.string(),
        exerciseId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const workout = await ctx.prisma.workout.create({
        data: {
          userId: ctx.session.user.id,
          date: input.date,
          weight: input.weight,
          reps: input.reps,
          sets: input.sets,
          note: input.note,
          exerciseId: input.exerciseId,
          weeklyReportPublished: false
        },
      });
      return workout;
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      note: z.string()
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
      const volume = ctx.prisma.$queryRaw<VolumeProp[]>`select sum("weight" * "reps" * "sets") "totalVolume" from "Workout" where "userId"=${ctx.session.user.id} and to_char(date,'YYYY-MM-DD')=${dateString} and weight > 0 group by date;`
      return volume;
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
