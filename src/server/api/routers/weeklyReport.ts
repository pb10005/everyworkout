import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const weeklyReportRouter = createTRPCRouter({
  getUserReports: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.weeklyReport.findMany({
        where: {
            userId: ctx.session?.user?.id
        },
        orderBy: {
            executeDate: 'desc'
        },
        take: 3
    });
  }),
});