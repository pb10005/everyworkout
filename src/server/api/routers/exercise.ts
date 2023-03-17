import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

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
          is_main: true,
        },
        include: {
          exercise: true,
        },
      });
    }),
});
