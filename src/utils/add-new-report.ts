import { prisma } from "../server/db";

export const addNewReport = async () => {
    await prisma.$transaction(async (prisma) => {
        const today = new Date().toISOString().split("T")[0] || "";

        await prisma.weeklyReportMaster.upsert({
            where: {
                executeDate: today
            },
            update: {},
            create: {
                executeDate: today,
                isGenerated: false
            }
        });
    });

    return 0;
};