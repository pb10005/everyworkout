"use client";

import type { BodyPart, Exercise, Muscle } from "@prisma/client";
import { useState } from "react";
import {
    Button,
    ExerciseSelector,
} from "../../../components";
import { useExerciseSelector } from "../../../hooks/useExerciseSelector";

type Props = {
    exercises: Exercise[];
    bodyParts: BodyPart[];
    muscles: (Muscle & { exercises: { exercise: Exercise }[] })[];
    startSets: (
        date: string,
        weight: string,
        reps: string,
        expiryTimeDelta: number,
        selectedBodyPartId: number,
        selectedExerciseId: number,
        selectedExerciseName: string
    ) => void;
    initialExerciseId?: number;
    initialBodyPartId?: number;
};

export function SetConfigForm(props: Props) {
    const { exercises, bodyParts, muscles, startSets, initialExerciseId, initialBodyPartId } = props;

    const [date, setDate] = useState<string>(
        new Date().toISOString().split("T")[0] || ""
    );
    const [weight, setWeight] = useState<string>("50");
    const [reps, setReps] = useState<string>("10");
    const [expiryTimeDelta, setExpiryTimeDelta] = useState<number>(120);

    const {
        selectBodyPartId,
        selectedBodyPartId,
        selectExerciseId,
        selectedExerciseId,
        selectedExerciseName,
    } = useExerciseSelector(exercises, initialExerciseId, initialBodyPartId);

    const handleExerciseClick = (exerciseId: number) => {
        selectExerciseId(exerciseId);
    };

    const handleBodyPartClick = (id: number) => {
        selectBodyPartId(id);
    };
    return (<>
        <div className="flex flex-col gap-2 m-2 md:m-0">
            <div className="flex flex-col gap-2">
                <label
                    className=" block text-sm font-bold text-gray-700 dark:text-gray-300"
                    htmlFor="date"
                >
                    日付
                </label>
                <input
                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                            text-gray-700 shadow focus:outline-none
                            dark:bg-gray-700 dark:text-white dark:border-gray-500"
                    id="date"
                    type="date"
                    placeholder="日付"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                    種目
                </label>
                {bodyParts && muscles && <ExerciseSelector
                    selectedExerciseId={selectedExerciseId}
                    selectedBodyPartId={selectedBodyPartId}
                    bodyParts={bodyParts}
                    muscles={muscles}
                    handleExerciseClick={handleExerciseClick}
                    handleBodyPartClick={handleBodyPartClick}
                />}
            </div>
            <div className="flex flex-col gap-2">
                <label
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300"
                    htmlFor="weight"
                >
                    重量
                </label>
                <input
                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                            text-gray-700 shadow focus:outline-none
                            dark:bg-gray-700 dark:text-white dark:border-gray-500"
                    id="weight"
                    type="number"
                    step="2.5"
                    placeholder="重量"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300"
                    htmlFor="reps"
                >
                    rep数
                </label>
                <input
                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                            text-gray-700 shadow focus:outline-none
                            dark:bg-gray-700 dark:text-white dark:border-gray-500"
                    id="reps"
                    type="number"
                    placeholder="rep数"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                />
            </div>
            <div className="">
                <label
                    className=" block text-sm font-bold text-gray-700 dark:text-gray-300"
                    htmlFor="username"
                >
                    インターバル(秒)
                </label>
                <input
                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                            text-gray-700 shadow focus:outline-none
                            dark:bg-gray-700 dark:text-white dark:border-gray-500"
                    id="interval"
                    type="number"
                    placeholder="インターバル(秒)"
                    value={expiryTimeDelta}
                    onChange={(e) => setExpiryTimeDelta(parseInt(e.target.value) || 0)}
                />
            </div>
            <Button onClick={() => startSets(
                date,
                weight,
                reps,
                expiryTimeDelta,
                selectedBodyPartId,
                selectedExerciseId,
                selectedExerciseName || '')}>セットを始める</Button>
        </div>
    </>);
}