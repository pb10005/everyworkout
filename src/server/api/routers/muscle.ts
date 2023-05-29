import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const muscleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.muscle.findMany();
  }),
  getAllExercises: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.muscle.findMany({
      include: {
        exercises: {
          select: {
            exercise: true
          }
        }
      }
    })
  }),
  getExercisesByBodyPartId: publicProcedure.input(z.object({
    bodyPartId: z.number(),
  })).query(({ ctx, input }) => {
    return ctx.prisma.muscle.findMany({
      include: {
        exercises: {
          select: {
            exercise: true
          }
        }
      },
      where: {
        bodyPartId: input.bodyPartId
      }
    })
  })
});
