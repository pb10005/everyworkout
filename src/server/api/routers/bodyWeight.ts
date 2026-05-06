import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const bodyWeightRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        weight: z.number().positive().max(999),
        date: z.string().datetime(),
        note: z.string().max(200).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.bodyWeight.create({
        data: {
          userId: ctx.session.user.id,
          weight: input.weight,
          date: input.date,
          note: input.note,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.bodyWeight.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),

  getUserBodyWeights: protectedProcedure
    .input(
      z.object({
        take: z.number().optional(),
        skip: z.number().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.bodyWeight.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { date: "desc" },
        take: input.take,
        skip: input.skip ?? 0,
      });
    }),

  getUserBodyWeightsForChart: protectedProcedure
    .input(
      z.object({
        days: z.number().min(7).max(365).default(90),
      })
    )
    .query(({ ctx, input }) => {
      const since = new Date();
      since.setDate(since.getDate() - input.days);
      return ctx.prisma.bodyWeight.findMany({
        where: {
          userId: ctx.session.user.id,
          date: { gte: since },
        },
        orderBy: { date: "asc" },
        select: { id: true, weight: true, date: true, note: true },
      });
    }),
});
