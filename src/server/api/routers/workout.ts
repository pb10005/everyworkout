import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workoutRouter = createTRPCRouter({
  add: protectedProcedure
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
          userId: ctx.session.user.id,
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


  getWorkoutById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workout.findFirstOrThrow({
        where: { id: input.id, userId: ctx.session.user.id },
        include: { exercise: true },
      });
    }),

  getUserWorkouts: protectedProcedure
    .input(z.object({ limit: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workout.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { date: "desc" },
        take: input.limit,
        include: { exercise: true },
      });
    }),
    
  getUserWorkoutsByExerciseId: protectedProcedure.input(
    z.object({
      exerciseId: z.number(),
      skip: z.number(),
      perPage: z.number()
    })
  ).query(({ctx, input}) => {
    return ctx.prisma.workout.findMany({
      where: {userId: ctx.session.user.id, exerciseId: input.exerciseId},
      orderBy: { date: "desc" },
      skip: input.skip,
      take: input.perPage,
      include: { exercise: true }
    })
  }),
  
  getUserWorkoutsCountByExerciseId: protectedProcedure.input(
    z.object({
      exerciseId: z.number(),
    })
  ).query(({ctx, input}) => {
    return ctx.prisma.workout.count({
      where: {userId: ctx.session.user.id, exerciseId: input.exerciseId},
    })
  }),
  
  getUserWorkoutsByDate: protectedProcedure
    .input(
      z.object({
        date: z.string().datetime(),
        skip: z.number(),
        perPage: z.number(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.workout.findMany({
        where: { userId: ctx.session.user.id, date: input.date },
        orderBy: { date: "desc" },
        skip: input.skip,
        take: input.perPage,
        include: { exercise: true },
      });
    }),
});
