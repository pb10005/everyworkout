"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type { WorkoutProp } from "../../../components/types";
import { Button, Timer } from "../../../components";

type Props = {
    endSets: (sets: string) => void;
};

export function SetRecorder(props: Props) {
    const { endSets } = props;
    const router = useRouter();
    const [date, setDate] = useState<string>("");

    const [weight, setWeight] = useState<string>("50");
    const [reps, setReps] = useState<string>("10");
    const [sets, setSets] = useState<string>("-1");
    const [expiryTimeDelta, setExpiryTimeDelta] = useState<number>(120);
    const [selectedExerciseId, selectExerciseId] = useState(-1);
    const [selectedExerciseName, selectExerciseName] = useState("");
    const [selectedBodyPartId, selectBodyPartId] = useState(-1);

    const saveSession = (currentSet: string) => {
        const data: WorkoutProp = {
            date,
            selectedExerciseId,
            selectedBodyPartId,
            selectedExerciseName,
            weight,
            reps,
            sets: currentSet,
            expiryTimeDelta,
        };
        window.sessionStorage.setItem('workout', JSON.stringify(data));
    };

    const onPrevSet = () => {
        const tmp = Math.max(parseInt(sets) - 1, 0);
        setSets(tmp.toString());
        saveSession(tmp.toString());
        setExpiryTimeDelta(expiryTimeDelta);
    };

    const onNextSet = () => {
        const tmp = parseInt(sets) + 1;
        setSets(tmp.toString());
        saveSession(tmp.toString());
        setExpiryTimeDelta(expiryTimeDelta);
    };

    const handleEndButtonClick = () => {
        endSets(sets);
    };

    const clear = () => {
        window.sessionStorage.removeItem("workout");
        router.push('/workout-menu');
    };

    useEffect(() => {
        const item = window.sessionStorage.getItem('workout');
        const workout = item && JSON.parse(item) as WorkoutProp;
        if (workout) {
            setDate(workout.date);
            selectExerciseId(workout.selectedExerciseId);
            selectExerciseName(workout.selectedExerciseName);
            selectBodyPartId(workout.selectedBodyPartId);
            setWeight(workout.weight);
            setReps(workout.reps);
            setExpiryTimeDelta(workout.expiryTimeDelta);
            setSets(workout.sets);
        }
    }, [setDate, selectExerciseId, selectExerciseName, selectBodyPartId, setWeight, setReps, setExpiryTimeDelta, setSets]);

    return (<>
        <div className="dark:text-white">
            <p className="text-xl font-bold">{selectedExerciseName}</p>
            <div className="flex flex-col justify-center gap-2">
                <div className="flex justify-center gap-2">
                    <div><span className="text-3xl font-extrabold text-[#42bfec]">{weight}</span>kg</div>
                    <div><span className="text-3xl font-extrabold text-[#42bfec]">{reps}</span>reps</div>
                </div>
                <div className="flex justify-center items-center">
                    <ChevronLeftIcon onClick={onPrevSet} className="w-10 h-10 cursor-pointer"></ChevronLeftIcon>
                    <span className="text-3xl font-extrabold text-[#42bfec]">{parseInt(sets) + 1}</span>セット目
                    <ChevronRightIcon onClick={onNextSet} className="w-10 h-10 cursor-pointer"></ChevronRightIcon>
                </div>
            </div>
        </div>
        <label
            className=" block text-sm font-bold text-gray-700 dark:text-gray-300"
        >
            インターバル
        </label>
        <div>
            <Timer expiryTimeDelta={expiryTimeDelta} onExpire={onNextSet}></Timer>
        </div>
        <div className="flex flex-col justify-center gap-2 mt-2">
            <Button onClick={handleEndButtonClick}>セットを終了して記録</Button>
            <Button onClick={() => void clear()}>記録しないで終了</Button>
        </div>
    </>);
}
