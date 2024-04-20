import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const weeklyReportRouter = createTRPCRouter({
  getUserReports: protectedProcedure.query(({ ctx }) => {
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