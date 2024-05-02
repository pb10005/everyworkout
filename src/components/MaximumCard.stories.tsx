import { MaximumCard } from "./MaximumCard";

export default {
    component: MaximumCard,
    title: 'Maximum card',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        date: new Date('2024-04-01'),
        exerciseName: 'ベンチプレス',
        metrics_code: '01',
        value: 100
    }
};

export const Remove = {
    args: {
        date: new Date('2024-04-01'),
        exerciseName: 'ベンチプレス',
        metrics_code: '01',
        value: 100,
        removeMaximum: (e: MouseEvent | TouchEvent) => { return }
    }
};