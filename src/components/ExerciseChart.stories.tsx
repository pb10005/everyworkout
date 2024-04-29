import { ExerciseChart } from "./ExerciseChart";

export default {
    component: ExerciseChart,
    title: 'Exercise chart',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        chartData: [
            { date: new Date('2024-04-01').getTime(), volume: 100 },
            { date: new Date('2024-04-02').getTime(), volume: 200 },
            { date: new Date('2024-04-03').getTime(), volume: 300 },
            { date: new Date('2024-04-01').getTime(), maximum: 100 },
            { date: new Date('2024-04-02').getTime(), maximum: 150 },
            { date: new Date('2024-04-03').getTime(), maximum: 130 },
        ]
    }
};

export const NoData = {
    args: {
        chartData: []
    }
};