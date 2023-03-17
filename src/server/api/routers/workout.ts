import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const workoutRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        userId: z.string(),
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
          userId: input.userId,
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

  getUserWorkout: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workout.findMany({
        where: { userId: input.userId },
        include: { exercise: true },
      });
    }),
});
