import { RecordCard } from "./RecordCard";

export default {
    component: RecordCard,
    title: 'RecordCard',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        id: '1',
        exerciseName: 'ベンチプレス',
        date: new Date('2024-01-15'),
        weight: 80,
        reps: 10,
        sets: 3,
        note: 'フォームを意識する',
        muscles: [
            { id: 1, name: '大胸筋' },
            { id: 2, name: '三頭筋' },
        ],
    },
};

export const Cardio = {
    args: {
        id: '2',
        exerciseName: 'ランニング',
        date: new Date('2024-01-15'),
        weight: null,
        reps: 1,
        sets: 1,
        note: null,
        muscles: [],
        duration: 30,
        calories: 200,
    },
};
