import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workoutMenuRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        exercisesJson: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const workoutMenu = await ctx.prisma.workoutMenu.create({
        data: {
            title: input.title,
            userId: ctx.session.user.id,
            exercisesJson: input.exercisesJson
        },
      });
      return workoutMenu;
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string(),
      exercisesJson: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.workoutMenu.updateMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: {
          title: input.title,
          exercisesJson: input.exercisesJson
        }
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.workoutMenu.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id
        }
      })
    }),

  getWorkoutMenuById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workoutMenu.findFirstOrThrow({
        where: { id: input.id, userId: ctx.session.user.id },
      });
    }),

  getUserWorkoutMenus: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.workoutMenu.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    })
  }),
});
