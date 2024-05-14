import { useState } from "react";

import { api } from "../../../utils/api";
import {
    Button,
} from "../../../components";
import { useRouter } from "next/navigation";

type Props = {
    date: string;
    selectedExerciseId: number;
    selectedExerciseName: string;
    weight: string;
    reps: string;
    sets: string;
};

export function ConfirmSubmit(props: Props) {
    const router = useRouter();
    const { date, selectedExerciseId, selectedExerciseName, weight, reps: initialReps, sets: initialSets } = props;
    const [reps, setReps] = useState<string>(initialReps || "0");
    const [note, setNote] = useState<string>("");
    const [sets, setSets] = useState<string>(initialSets || "0");
    
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
    return (<>
    <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
            <label
                className=" block text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="date"
            >
                日付
            </label>
            <p className="dark:text-white">{date}</p>
        </div>
        <div className="flex flex-col gap-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                種目
            </label>
            <p className="dark:text-white">{selectedExerciseName}</p>
        </div>
        <div className="">
            <label
                className=" block text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="weight"
            >
                重量
            </label>
            <p className="dark:text-white">{weight}kg</p>
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
   </>); 
}