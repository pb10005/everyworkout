"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { type NextPage } from "next";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import {
    Button,
    Heading,
    Navigation,
    ExerciseSelector,
    Loading,
    Timer,
} from "../../../components";
import { api } from "../../../utils/api";
import { useExerciseSelector } from "../../../hooks/useExerciseSelector";

type WorkoutProp = {
    date: string;
    selectedExerciseId: number;
    selectedExerciseName: string;
    weight: string;
    reps: string;
    sets: string;
    expiryTimeDelta: number;
};

function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const exerciseId = searchParams?.get('exerciseId');
    const bodyPartId = searchParams?.get('bodyPartId');
    const {
        selectBodyPartId,
        selectedBodyPartId,
        selectExerciseId,
        selectedExerciseId,
        selectedExerciseName,
        bodyParts,
        muscles,
    } = useExerciseSelector(parseInt(exerciseId || "-1"), parseInt(bodyPartId || "-1"));

    const [date, setDate] = useState<string>(
        new Date().toISOString().split("T")[0] || ""
    );
    const [error, setError] = useState<string>("");
    const [isEnd, setEnd] = useState<boolean>(false);

    const [weight, setWeight] = useState<string>("50");
    const [reps, setReps] = useState<string>("10");
    const [sets, setSets] = useState<string>("-1");
    const [note, setNote] = useState<string>("");
    const [expiryTimeDelta, setExpiryTimeDelta] = useState<number>(120);

    const mutation = api.workout.add.useMutation();

    const send = async () => {
        await mutation
            .mutateAsync({
                date: new Date(date).toISOString(),
                weight: parseFloat(weight),
                reps: parseInt(reps),
                sets: parseInt(sets),
                note: note,
                exerciseId: selectedExerciseId,
            })
            .then(({ id }) => {
                window.sessionStorage.removeItem('workout');
                return router.push(`/workout/${id}`);
            })
            .catch(() => {
                return;
            });
    };
    const handleExerciseClick = (exerciseId: number) => {
        selectExerciseId(exerciseId);
    };
    
    const handleBodyPartClick = (id: number) => {
      selectBodyPartId(id);
    };

    const startSets = () => {
        if (selectedExerciseId < 0) {
            setError("種目を選んでください");
            return;
        }

        saveSession("0");
        setSets("0");
        setError("");
    };

    const saveSession = (currentSet: string) => {
        const data: WorkoutProp = {
            date,
            selectedExerciseId,
            selectedExerciseName,
            weight,
            reps,
            sets: currentSet,
            expiryTimeDelta,
        };

        window.sessionStorage.setItem('workout', JSON.stringify(data));
    };
    const endSets = () => {
        const tmp = parseInt(sets) + 1;
        setSets(tmp.toString());
        setEnd(true);
    };

    const clear = () => {
        window.sessionStorage.removeItem("workout");
        router.push('/dashboard');
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


    useEffect(() => {
        const item = window.sessionStorage.getItem('workout');
        const workout = item && JSON.parse(item) as WorkoutProp;
        if (workout) {
            setDate(workout.date);
            selectExerciseId(workout.selectedExerciseId);
            setWeight(workout.weight);
            setReps(workout.reps);
            setExpiryTimeDelta(workout.expiryTimeDelta);
            setSets(workout.sets);
        }
    });

    useEffect(() => {
        selectExerciseId(parseInt(exerciseId || "-1"));
    }, [exerciseId, selectExerciseId]);

    return (
        <>
            <main>
                <Heading />
                <Navigation />
                <div className="grid md:grid-cols-12">
                    <div className="md:col-span-6 md:col-start-4 bg-white p-2 md:p-4 mt-4 rounded-lg dark:bg-gray-900 dark:text-white dark:outline outline-1 outline-gray-500">
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
                            <div className="flex flex-col gap-2">
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
                                <Button onClick={startSets}>セットを始める</Button>
                            </div>
                        </>}
                        {!isEnd && sets !== "-1" && <>
                            <p className="text-xl font-bold">{selectedExerciseName}</p>
                            <div className="flex flex-col justify-center gap-2">
                                <div className="flex justify-center gap-2">
                                    <div><span className="text-3xl font-extrabold">{weight}</span>kg</div>
                                    <div><span className="text-3xl font-extrabold">{reps}</span>reps</div>
                                </div>
                                <div className="flex justify-center items-center">
                                    <ChevronLeftIcon onClick={onPrevSet} className="w-10 h-10 cursor-pointer"></ChevronLeftIcon>
                                    <span className="text-3xl font-extrabold">{parseInt(sets) + 1}</span>セット目
                                    <ChevronRightIcon onClick={onNextSet} className="w-10 h-10 cursor-pointer"></ChevronRightIcon>
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
                                <Button onClick={endSets}>セットを終了して記録</Button>
                                <Button onClick={() => void clear()}>記録しないで終了</Button>
                            </div>
                        </>}
                        {isEnd && <>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    <label
                                        className=" block text-sm font-bold text-gray-700 dark:text-gray-300"
                                        htmlFor="date"
                                    >
                                        日付
                                    </label>
                                    <p>{date}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                                        種目
                                    </label>
                                    <p>{selectedExerciseName}</p>
                                </div>
                                <div className="">
                                    <label
                                        className=" block text-sm font-bold text-gray-700 dark:text-gray-300"
                                        htmlFor="weight"
                                    >
                                        重量
                                    </label>
                                    <p>{weight}kg</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        className=" block text-sm font-bold text-gray-700 dark:text-gray-300"
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
                                <div className="flex flex-col gap-2">
                                    <label
                                        className=" block text-sm font-bold text-gray-700 dark:text-gray-300"
                                        htmlFor="sets"
                                    >
                                        セット数
                                    </label>
                                    <input
                                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                                            text-gray-700 shadow focus:outline-none
                                            dark:bg-gray-700 dark:text-white dark:border-gray-500"
                                        id="sets"
                                        type="number"
                                        placeholder="セット数"
                                        value={sets}
                                        onChange={(e) => setSets(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        className=" block text-sm font-bold text-gray-700 dark:text-gray-300"
                                        htmlFor="note"
                                    >
                                        メモ
                                    </label>
                                    <input
                                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                                            text-gray-700 shadow focus:outline-none
                                            dark:bg-gray-700 dark:text-white dark:border-gray-500"
                                        id="note"
                                        type="text"
                                        placeholder="メモ"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                </div>
                                {!mutation.isLoading && (
                                    <Button onClick={() => void send()}>登録</Button>
                                )}
                            </div>
                        </>}
                    </div>
                </div>
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
