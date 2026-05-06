import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userSettingsRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userSettings.findUnique({
      where: { userId: ctx.session.user.id },
    });
  }),
});
