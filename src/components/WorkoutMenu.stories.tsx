import { WorkoutMenu } from "./WorkoutMenu";

export default {
    component: WorkoutMenu,
    title: 'Workout menu',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        exercises: [
            {id: 1, name: 'ベンチプレス', isSelected: false },
            {id: 2, name: 'スクワット', isSelected: false },
            {id: 3, name: 'デッドリフト', isSelected: false },
        ],
        handleExerciseClick: (id: string) => { alert('selected: ' + id); }
    }
};

export const Selected = {
    args: {
        exercises: [
            {id: 1, name: 'ベンチプレス', isSelected: true },
            {id: 2, name: 'スクワット', isSelected: true },
            {id: 3, name: 'デッドリフト', isSelected: false },
        ],
        handleExerciseClick: (id: string) => { alert('selected: ' + id); }
    }
};
