import { prisma } from "../server/db";

export const generateReport = async () => {
    await prisma.$transaction(async (prisma) => {
        const dateLt = new Date();
        
        const dateGte = new Date(dateLt);
        dateGte.setDate(dateGte.getDate() - 7);
    
        const users = await prisma.user.findMany();
        const exercises = await prisma.exercise.findMany();
    
        const result = await prisma.workout.groupBy({
            by: ["userId"],
            _count: true,
            where: {
                date: {
                  gte: dateGte,
                  lt:  dateLt
                },
                weeklyReportPublished: false
            }
        });
    
        const reports = result.map(r => {
            const name = users.find(u => u.id === r.userId)?.name;
            const report = `${name || 'Anonymous'}さんは先週${r._count}回ワークアウトしました！`;
    
            return {
                userId: r.userId || '',
                content: report
            }
        });
    
        // レポートを登録する
        await prisma.weeklyReport.createMany({
            data: reports
        });
    
        // レポート作成済みフラグを立てる
        await prisma.workout.updateMany({
            data: {
                weeklyReportPublished: true
            },
            where:  {
                date: {
                  gte: dateGte,
                  lt:  dateLt
                },
                weeklyReportPublished: false
            }
        });
    });
    
    return 0;
};
