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

  getWorkoutById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workout.findUnique({
        where: { id: input.id },
        include: { exercise: true },
      });
    }),

  getUserWorkouts: publicProcedure
    .input(z.object({ userId: z.string(), limit: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workout.findMany({
        where: { userId: input.userId },
        orderBy: { date: "desc" },
        take: input.limit,
        include: { exercise: true },
      });
    }),
    
  getUserWorkoutsByExerciseId: publicProcedure.input(
    z.object({
      userId: z.string(),
      exerciseId: z.number(),
      skip: z.number(),
      perPage: z.number()
    })
  ).query(({ctx, input}) => {
    return ctx.prisma.workout.findMany({
      where: {userId: input.userId, exerciseId: input.exerciseId},
      orderBy: { date: "desc" },
      skip: input.skip,
      take: input.perPage,
      include: { exercise: true }
    })
  }),
  
  getUserWorkoutsCountByExerciseId: publicProcedure.input(
    z.object({
      userId: z.string(),
      exerciseId: z.number(),
    })
  ).query(({ctx, input}) => {
    return ctx.prisma.workout.count({
      where: {userId: input.userId, exerciseId: input.exerciseId},
    })
  }),
  
  getUserWorkoutsByDate: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        date: z.string().datetime(),
        skip: z.number(),
        perPage: z.number(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.workout.findMany({
        where: { userId: input.userId, date: input.date },
        orderBy: { date: "desc" },
        skip: input.skip,
        take: input.perPage,
        include: { exercise: true },
      });
    }),
});
