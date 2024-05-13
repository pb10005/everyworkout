"use client";

import type { Exercise } from "@prisma/client";
import { useState } from "react";
import { api } from "../utils/api";

export const useExerciseSelector = (initialExerciseId?: number, initialBodyPartId?: number) => {
    const [selectedExerciseId, selectExerciseId] = useState(initialExerciseId || -1);
    const [selectedBodyPartId, selectBodyPartId] = useState<number>(initialBodyPartId || -1);

    const { data: bodyParts } = api.bodyPart.getAll.useQuery();
    const { data: muscles } = api.muscle.getExercisesByBodyPartId.useQuery({ bodyPartId: selectedBodyPartId });
    const { data: exercises } = api.exercise.getAll.useQuery();

    const selectedExerciseName = exercises?.find((e: Exercise) => e.id === selectedExerciseId)?.name || '';

    return {
        selectBodyPartId,
        selectedBodyPartId,
        selectExerciseId,
        selectedExerciseId,
        selectedExerciseName,
        bodyParts,
        muscles,
    }
};