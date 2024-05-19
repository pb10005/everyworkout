export type ChartProp = {
    date: number;
    maximum: number;
    volume: number;
    cumulativeVolume: number;
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


export type WorkoutProp = {
    date: string;
    selectedExerciseId: number;
    selectedBodyPartId: number;
    selectedExerciseName: string;
    weight: string;
    reps: string;
    sets: string;
    expiryTimeDelta: number;
};

export type DailyVolumeProp = {
    date: Date;
    totalVolume: number;
};
