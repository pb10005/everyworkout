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
            const weekData = await prisma.workout.findMany({
                select: {
                    userId: true,
                    date: true,
                    exerciseId: true,
                    weight: true,
                    reps: true,
                    sets: true
                },
                where: {
                   date: {
                    gte: dateGte,
                    lt: dateLt
                   } 
                }
            });
            
            type StatProps = {
                dates: Set<string>;
                count: number;
                volume: number;
                exercises: Set<number>;
            };
            
            const stats = weekData.reduce((acc, suc) => {
                const userId = suc.userId;
                if(userId) {
                    // すでにキーが存在する場合
                    if(suc.weight) {
                        const tmp: Set<number> = acc[userId]?.exercises || new Set<number>();
                        tmp.add(suc.exerciseId);

                        const tmpDates = acc[userId]?.dates || new Set<string>();
                        const dateString = suc.date.toISOString().split('T')[0];
                        if(dateString) tmpDates.add(dateString);

                        acc[userId] = {
                            dates: tmpDates,
                            count: (acc[userId]?.count || 0) + 1,
                            volume: (acc[userId]?.volume || 0) + suc.weight * suc.reps * suc.sets,
                            exercises: tmp
                        }
                    }
                }

                return acc;
            }, {} as Record<string, StatProps>);
        
            // ユーザー単位でレポートメッセージ生成
            const reports = users.map(u => {
                const stat = u.id ? stats[u.id] : {dates: new Set<string>(), count: 0, volume: 0, exercises: new Set<number>()};
                const count = stat?.dates.size || 0;
                const exerciseCount = stat?.exercises.size || 0;

                if(count <= 0) return null;
                
                const report = `${u.name || 'Anonymous'}さんは先週${count}回ワークアウトしました！\n行った種目は${exerciseCount}種類で、トータルボリュームは${stat?.volume || 0}kgでした。`;

                return {
                    userId: u.id || '',
                    content: report
                }
            });
        
            // レポートを登録する
            for(const report of reports) {
                if(report === null) continue;
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
