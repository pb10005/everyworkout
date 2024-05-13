import { number, z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const goalRouter = createTRPCRouter({
    add: protectedProcedure
        .input(z.object({
            content: z.string()
        }))
        .mutation(({ ctx, input}) => {
            return ctx.prisma.goal.create({
                data: {
                    userId: ctx.session.user.id,
                    content: input.content
                }
            });
        }),
    update: protectedProcedure
        .input(z.object({
            id: z.string().cuid(),
            content: z.string()
        }))
        .mutation(async ({ctx, input}) => {
            await ctx.prisma.goal.updateMany({
                data: {
                    content: input.content
                },
                where: {
                    id: input.id,
                    userId: ctx.session.user.id,
                }
            })
        }),
    getGoalById: protectedProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.goal.findFirstOrThrow({
                where: {
                    id: input.id,
                    userId: ctx.session.user.id
                }
            })
        }),
    getCurrentUserGoal: protectedProcedure
        .query(({ ctx }) => {
            return ctx.prisma.goal.findFirstOrThrow({
                where: {
                    userId: ctx.session.user.id,
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 1
            });
        }),
    getUserGoals: protectedProcedure
        .input(z.object({
           take: number().optional() 
        }))
        .query(({ ctx, input }) => {
            return ctx.prisma.goal.findMany({
                where: {
                    userId: ctx.session.user.id,
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: input.take
            });
        }),
});
