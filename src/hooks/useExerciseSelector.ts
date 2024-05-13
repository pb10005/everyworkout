"use client";

import { useState } from "react";
import { api } from "../utils/api";

export const useExerciseSelector = () => {
    const [selectedExerciseId, selectExerciseId] = useState(-1);
    const [selectedExerciseName, setExerciseName] = useState("");

    const [selectedBodyPartId, selectBodyPartId] = useState<number>(-1);

    const { data: bodyParts } = api.bodyPart.getAll.useQuery();
    const { data: muscles } = api.muscle.getExercisesByBodyPartId.useQuery({ bodyPartId: selectedBodyPartId });

    return {
        selectBodyPartId,
        selectedBodyPartId,
        selectExerciseId,
        selectedExerciseId,
        selectedExerciseName,
        setExerciseName,
        bodyParts,
        muscles,
    }
};