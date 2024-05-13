export type ChartProp = {
    date: number;
    maximum: number;
    volume: number;
};

export type WorkoutMenuItemProps = {
    exerciseId: number;
    bodyPartId: number;
};

export type WorkoutMenuSubmitProps = {
    title: string;
    exercises: WorkoutMenuItemProps[];
};

export type ExerciseProps = {
    id: number;
    bodyPartId: number;
    name: string;
    isSelected: boolean;
};