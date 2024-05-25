"use client";

import type { Exercise } from "@prisma/client";
import { useMemo, useState } from "react";

export const useExerciseSelector = (exercises?: Exercise[], initialExerciseId?: number, initialBodyPartId?: number) => {
    const [selectedExerciseId, selectExerciseId] = useState(initialExerciseId || -1);
    const [selectedBodyPartId, selectBodyPartId] = useState<number>(initialBodyPartId || -1);

    const selectedExerciseName = useMemo(() => {
        return exercises?.find((e: Exercise) => e.id === selectedExerciseId)?.name;
    }, [exercises, selectedExerciseId])

    return {
        selectBodyPartId,
        selectedBodyPartId,
        selectExerciseId,
        selectedExerciseId,
        selectedExerciseName,
    }
};