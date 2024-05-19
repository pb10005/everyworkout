import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const maximumRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        metrics_code: z.string(),
        value: z.number(),
        exerciseId: z.number(),
        date: z.string().datetime(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const maximum = await ctx.prisma.maximum.create({
        data: {
          userId: ctx.session.user.id,
          date: input.date,
          metrics_code: input.metrics_code,
          value: input.value,
          exerciseId: input.exerciseId,
        },
      });
      return maximum;
    }),

  delete: protectedProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.maximum.deleteMany({
        where: {
          userId: ctx.session.user.id,
          id: input.id
        }
      })
    }),

  getUserMaximums: protectedProcedure
    .query(async ({ ctx, input }) => {
      const exercises = await ctx.prisma.exercise.findMany({});
      const maximums = await ctx.prisma.maximum.groupBy({
        by: ["exerciseId", "metrics_code"],
        _max: { value: true },
        where: {
          userId: ctx.session.user.id
        },
        orderBy: {
          exerciseId: "asc",
        },
      });
      return maximums.map((d) => {
        const e = exercises.find((x) => x.id === d.exerciseId);
        return {
          exerciseId: d.exerciseId,
          exercise: e,
          metrics_code: d.metrics_code,
          value: d._max.value,
        };
      });
    }),

  getUserMaximumsByExerciseId: protectedProcedure
    .input(z.object({
      exerciseId: z.number(),
      inThisWeek: z.boolean()
    }))
    .query(async ({ ctx, input }) => {
      type MaxProps = {
        max: string;
      };
      const maxDate = await ctx.prisma.$queryRaw<MaxProps[]>`select max("executeDate") from "WeeklyReportMaster"`;
      const dateQuery = new Date(maxDate[0]?.max || '1975-01-01').toISOString().split('T')[0] || '';

      const maximums = await ctx.prisma.maximum.findMany({
        where: {
          userId: ctx.session.user.id,
          exerciseId: input.exerciseId,
          date: {
            gte: input.inThisWeek ? new Date(dateQuery) : undefined
          }
        },
        orderBy: {
          date: "desc",
        },
        include: {
          exercise: true,
        },
      });
      return maximums;
    }),
});
