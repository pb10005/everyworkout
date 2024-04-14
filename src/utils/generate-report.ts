import { exec } from "child_process";
import { prisma } from "../server/db";

export const generateReport = async () => {
    await prisma.$transaction(async (prisma) => {
        // 対象の基準日を取得する
        const dates = await prisma.weeklyReportMaster.findMany({
            where: {
                isGenerated: false
            }
        });

        for(const { executeDate } of dates) {
            // 基準日ごとにレポートを作成する
            const dateGte = new Date(executeDate);
            dateGte.setDate(dateGte.getDate() - 7);

            const dateLt = new Date(executeDate);
    
            // テーブルデータ取得
            const users = await prisma.user.findMany();
        
            const result = await prisma.workout.groupBy({
                by: ["userId"],
                _count: true,
                where: {
                    date: {
                      gte: dateGte,
                      lt:  dateLt
                    }
                }
            });
        
            // レポートメッセージ生成
            const reports = result.map(r => {
                const name = users.find(u => u.id === r.userId)?.name;
                const report = `${name || 'Anonymous'}さんは先週${r._count}回ワークアウトしました！`;
        
                return {
                    userId: r.userId || '',
                    content: report
                }
            });
        
            // レポートを登録する
            for(const report of reports) {
                const count = await prisma.weeklyReport.count({
                    where: {
                        executeDate: executeDate,
                        userId: report.userId
                    }
                });

                if(count > 0) {
                    await prisma.weeklyReport.updateMany({
                        where: {
                            executeDate: executeDate,
                            userId: report.userId
                        },
                        data: {
                            content: report.content
                        }
                    });
                } else {
                    await prisma.weeklyReport.create({
                        data: {
                            executeDate: executeDate,
                            userId: report.userId,
                            content: report.content
                        }
                    });
                }
            }
        
            // レポート作成済みフラグを立てる
            await prisma.weeklyReportMaster.update({
                data: {
                    isGenerated: true
                },
                where: {
                    executeDate: executeDate
                }
            })
            await prisma.workout.updateMany({
                data: {
                    weeklyReportPublished: true
                },
                where:  {
                    date: {
                      gte: dateGte,
                      lt:  dateLt
                    }
                }
            });
        }
    });
    
    return 0;
};
