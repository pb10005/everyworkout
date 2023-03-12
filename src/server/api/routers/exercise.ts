import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exerciseRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany();
  }),
});
