import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exerciseRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany();
  }),
  getByMuscleId: publicProcedure
    .input(z.object({ muscleId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.exerciseMuscle.findMany({
        where: {
          muscleId: input.muscleId,
        },
        include: {
          exercise: true,
        },
      });
    }),
});