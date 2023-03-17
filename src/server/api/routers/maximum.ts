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
    .query(({ ctx, input }) => {
      return ctx.prisma.maximum.findMany({
        where: { userId: input.userId },
        include: { exercise: true },
      });
    }),
});
