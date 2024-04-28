import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUniqueOrThrow({
      where: {
        id: ctx.session.user.id,
      },
    })
  }),
});
