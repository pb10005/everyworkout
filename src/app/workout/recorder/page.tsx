"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { type NextPage } from "next";

import { api } from "../../../utils/api";

import { Loading } from "../../../components";
import { Heading, Navigation, Container } from "../../../components/server";

import type { WorkoutProp } from "../../../components/types";

import { SetRecorder } from "./SetRecorder";
import { ConfirmSubmit } from "./ConfirmSubmit";
import { SetConfigForm } from "./SetConfigForm";

function Page() {
    const searchParams = useSearchParams();

    const exerciseId = searchParams?.get('exerciseId') || "-1";
    const bodyPartId = searchParams?.get('bodyPartId') || "-1";

    const [error, setError] = useState<string>("");
    const [isEnd, setEnd] = useState<boolean>(false);
    const [sets, setSets] = useState<string>("-1");

    const { data: exercises } = api.exercise.getAll.useQuery();
    const { data: bodyParts } = api.bodyPart.getAll.useQuery();
    const { data: muscles } = api.muscle.getAllExercises.useQuery();
    const mutation = api.workout.add.useMutation();

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
            <main className="md:mt-4">
                <Heading />
                <Navigation currentPage="workout-recorder" />
                <Container>
                    {mutation.isLoading && <Loading />}
                    {mutation.isError && (
                        <p className=" rounded-lg bg-red-100 p-4 text-red-900">
                            エラーが発生しました: {mutation.error.data?.path}
                        </p>
                    )}
                    {error && (
                        <p className=" rounded-lg bg-red-100 p-4 text-red-900">
                            {error}
                        </p>
                    )}
                    {!isEnd && (sets === "-1" ? <>
                        <SetConfigForm
                            bodyParts={ bodyParts || []}
                            muscles={ muscles || []}
                            exercises={ exercises || []}
                            startSets={startSets}
                            initialExerciseId={parseInt(exerciseId) || -1}
                            initialBodyPartId={parseInt(bodyPartId) || -1} />
                    </> : <SetRecorder endSets={endSets} />)}
                    {isEnd && <>
                        <ConfirmSubmit
                            sets={sets} />
                    </>}
                </Container>
            </main >
        </>
    );
}

const WorkoutRecorder: NextPage = () => {
    return (<>
        <Suspense>
            <Page />
        </Suspense>
    </>)
};

export default WorkoutRecorder;
