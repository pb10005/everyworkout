"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { api } from "../../utils/api";
import { Loading } from "../../components";
import type { WorkoutProp } from "../../components/types";

import { SetRecorder } from "./SetRecorder";
import { ConfirmSubmit } from "./ConfirmSubmit";
import { SetConfigForm } from "./SetConfigForm";

export const WorkoutRecorderPage: React.FC = () => {
    const searchParams = useSearchParams();

    const exerciseId = searchParams?.get('exerciseId') || "-1";
    const bodyPartId = searchParams?.get('bodyPartId') || "-1";

    const [error, setError] = useState<string>("");
    const [isEnd, setEnd] = useState<boolean>(false);
    const [sets, setSets] = useState<string>("-1");

    const { data: exercises, isLoading: loadingE } = api.exercise.getAll.useQuery();
    const { data: bodyParts, isLoading: loadingB } = api.bodyPart.getAll.useQuery();
    const { data: muscles, isLoading: loadingM } = api.muscle.getAllExercises.useQuery();

    const isLoading = [
        loadingE,
        loadingB,
        loadingM,
    ].some(b => b);

    const startSets = (
        date: string,
        weight: string,
        reps: string,
        expiryTimeDelta: number,
        bodyPartId: number,
        exerciseId: number,
        exerciseName: string
    ) => {
        if (exerciseId < 0) {
            setError("種目を選んでください");
            return;
        }
        saveSession(date, weight, reps, expiryTimeDelta, bodyPartId, exerciseId, exerciseName, "0");
        setSets("0");
        setError("");
    };

    const endSets = (sets: string) => {
        const tmp = parseInt(sets) + 1;
        setSets(tmp.toString());
        setEnd(true);
    };

    const saveSession = (
        date: string,
        weight: string,
        reps: string,
        expiryTimeDelta: number,
        bodyPartId: number,
        exerciseId: number,
        exerciseName: string,
        currentSet: string
    ) => {
        const data: WorkoutProp = {
            date,
            selectedBodyPartId: bodyPartId,
            selectedExerciseId: exerciseId,
            selectedExerciseName: exerciseName,
            weight,
            reps,
            sets: currentSet,
            expiryTimeDelta,
        };
        window.sessionStorage.setItem('workout', JSON.stringify(data));
    };

    useEffect(() => {
        const item = window.sessionStorage.getItem('workout');
        const workout = item && JSON.parse(item) as WorkoutProp;
        if (workout) {
            setSets(workout.sets);
        }
    }, []);

    return (
        <>
            {isLoading && <Loading />}
            {error && (
                <p className=" rounded-lg bg-red-100 p-4 text-red-900">
                    {error}
                </p>
            )}
            {!isEnd && (sets === "-1" ? <>
                <SetConfigForm
                    bodyParts={bodyParts || []}
                    muscles={muscles || []}
                    exercises={exercises || []}
                    startSets={startSets}
                    initialExerciseId={parseInt(exerciseId) || -1}
                    initialBodyPartId={parseInt(bodyPartId) || -1} />
            </> : <SetRecorder endSets={endSets} />)}
            {isEnd && <>
                <ConfirmSubmit
                    sets={sets} />
            </>}
        </>
    );
};
