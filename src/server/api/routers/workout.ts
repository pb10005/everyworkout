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

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.workout.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id
        }
      })
    }),

  getWorkoutById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workout.findFirstOrThrow({
        where: { id: input.id, userId: ctx.session.user.id },
        include: {
          exercise: {
            select: {
              id: true,
              name: true,
              muscles: {
                include: {
                  muscle: {
                    select: {
                      id: true,
                      name: true
                    }
                  }
                }
              }
            }
          }
        },
      });
    }),

  getUserWorkouts: protectedProcedure.input(
    z.object({
      exerciseId: z.number().optional(),
      date: z.string().datetime().optional(),
      skip: z.number().optional(),
      take: z.number().optional()
    })
  ).query(({ ctx, input }) => {
    return ctx.prisma.workout.findMany({
      where: {
        userId: ctx.session.user.id,
        exerciseId: input.exerciseId,
        date: input.date
      },
      orderBy: { date: "desc" },
      skip: input.skip || 0,
      take: input.take,
      include: {
        exercise: {
          select: {
            id: true,
            name: true,
            muscles: {
              include: {
                muscle: {
                  select: {
                    id: true,
                    name: true,
                  }
                }
              }
            }
          }
        }
      }
    })
  }),

  getUserWorkoutsCountByExerciseId: protectedProcedure.input(
    z.object({
      exerciseId: z.number(),
    })
  ).query(({ ctx, input }) => {
    return ctx.prisma.workout.count({
      where: { userId: ctx.session.user.id, exerciseId: input.exerciseId },
    })
  }),

});
