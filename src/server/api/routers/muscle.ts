import { createTRPCRouter, publicProcedure } from "../trpc";

export const muscleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.muscle.findMany();
  }),
});
