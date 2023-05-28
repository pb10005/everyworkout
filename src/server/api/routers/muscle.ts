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
  })
});
