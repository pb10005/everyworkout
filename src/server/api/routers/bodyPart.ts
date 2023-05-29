import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const bodyPartRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.bodyPart.findMany();
  }),
});
