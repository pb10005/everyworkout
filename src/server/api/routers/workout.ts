import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const workoutRouter = createTRPCRouter({
  add: publicProcedure
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
          date: input.date,
          weight: input.weight,
          reps: input.reps,
          sets: input.sets,
          note: input.note,
          exerciseId: input.exerciseId,
        },
      });
      return workout;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.workout.findMany({ include: { exercise: true } });
  }),
});
