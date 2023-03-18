import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const maximumRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        metrics_code: z.string(),
        value: z.number(),
        exerciseId: z.number(),
        date: z.string().datetime(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const maximum = await ctx.prisma.maximum.create({
        data: {
          userId: input.userId,
          date: input.date,
          metrics_code: input.metrics_code,
          value: input.value,
          exerciseId: input.exerciseId,
        },
      });
      return maximum;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.maximum.findMany({ include: { exercise: true } });
  }),

  getUserMaximums: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const exercises = await ctx.prisma.exercise.findMany({});
      const maximums = await ctx.prisma.maximum.groupBy({
        by: ["exerciseId", "metrics_code"],
        _max: { value: true },
        where: { userId: input.userId },
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
});
