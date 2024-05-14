"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { type NextPage } from "next";

import { api } from "../../../utils/api";

import {
    Loading,
} from "../../../components";
import { Heading, Navigation, Container } from "../../../components/server";

import type { WorkoutProp } from "../../../components/types";

import { SetRecorder } from "./SetRecorder";
import { ConfirmSubmit } from "./ConfirmSubmit";
import { SetConfigForm } from "./SetConfigForm";

function Page() {
    const searchParams = useSearchParams();

    const exerciseId = searchParams?.get('exerciseId') || "-1";
    const bodyPartId = searchParams?.get('bodyPartId') || "-1";

    const [date, setDate] = useState<string>(
        new Date().toISOString().split("T")[0] || ""
    );
    const [error, setError] = useState<string>("");
    const [isEnd, setEnd] = useState<boolean>(false);

    const [selectedBodyPartId, selectBodyPartId] = useState<number>(-1);
    const [selectedExerciseId, selectExerciseId] = useState<number>(-1);
    const [selectedExerciseName, selectExerciseName] = useState<string>("");
    const [weight, setWeight] = useState<string>("50");
    const [reps, setReps] = useState<string>("10");
    const [sets, setSets] = useState<string>("-1");
    const [expiryTimeDelta, setExpiryTimeDelta] = useState<number>(120);

    const mutation = api.workout.add.useMutation();


    const startSets = (
        bodyPartId: number,
        exerciseId: number,
        exerciseName: string
    ) => {
        if (exerciseId < 0) {
            setError("種目を選んでください");
            return;
        }
        selectBodyPartId(bodyPartId);
        selectExerciseId(exerciseId);
        selectExerciseName(exerciseName);

        saveSession(bodyPartId, exerciseId, exerciseName, "0");
        setSets("0");
        setError("");
    };

    const endSets = (weight: string, reps: string, sets: string) => {
        const tmp = parseInt(sets) + 1;
        setSets(tmp.toString());
        setEnd(true);
        setWeight(weight);
        setReps(reps);
    };

    const saveSession = (
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
            setDate(workout.date);
            selectExerciseId(workout.selectedExerciseId);
            selectBodyPartId(workout.selectedBodyPartId);
            setWeight(workout.weight);
            setReps(workout.reps);
            setExpiryTimeDelta(workout.expiryTimeDelta);
            setSets(workout.sets);
        }
    }, []);

    useEffect(() => {
        if (exerciseId) selectExerciseId(parseInt(exerciseId || "-1"));
    }, [exerciseId]);

    return (
        <>
            <main className="mt-4">
                <Heading />
                <Navigation />
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
                    {!isEnd && sets === "-1" && <>
                        <SetConfigForm
                            exerciseId={exerciseId}
                            bodyPartId={bodyPartId}
                            startSets={startSets} />
                    </>}
                    {!isEnd && sets !== "-1" && <>
                        <SetRecorder endSets={endSets} />
                    </>}
                    {isEnd && <>
                        <ConfirmSubmit
                            date={date}
                            selectedExerciseId={selectedExerciseId}
                            selectedExerciseName={selectedExerciseName}
                            weight={weight}
                            reps={reps}
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
