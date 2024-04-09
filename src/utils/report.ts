import { prisma } from "../server/db";

type Report = {
    name: string;
    count: number;
};

export const generateReport = async () => {
    const users = await prisma.user.findMany();
    const exercises = await prisma.exercise.findMany();
    const result = await prisma.workout.groupBy({
        by: ["userId", "exerciseId"],
        _count: true
    });

    return result.map(r => {
        const name = users.find(u => u.id === r.userId)?.name;
        const exerciseName = exercises.find(e => e.id === r.exerciseId)?.name;
        return { name, exerciseName, count: r._count };
    });
};
