import * as React from "react";
import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

import { api } from "../utils/api";
import { Badge, EditNoteForm, Subheader } from "../components";

type Muscle = {
    id: number;
    name: string;
};

type Props = {
    id: string;
    exerciseName: string;
    date: Date;
    weight: number | null;
    reps: number;
    sets: number;
    note: string | null;
    muscles: Muscle[]
};

export const WorkoutCard: React.FC<Props> = (props: Props) => {
    const { id, date, exerciseName, weight, reps, sets, note, muscles } = props;
    const dateDisplay = date
        ? new Date(date).toISOString().split("T")[0] || ""
        : "";

    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [newNote, setNewNote] = useState<string>("");
    const utils = api.useContext();

    const updateMutation = api.workout.update.useMutation({
        async onSuccess() {
            await utils.workout.getWorkoutById.invalidate()
        }
    });

    const enablEeditMode = () => {
        setNewNote(note || "");
        setEditMode(true);
    };

    const onSubmit = async () => {
        await updateMutation.mutateAsync({ id: id || "", note: newNote });
        setNewNote("");
        setEditMode(false);
    };

    const onCancel = () => {
        setNewNote("");
        setEditMode(false);
    };

    return (
        <>
            <div className="w-full flex justify-between rounded-lg p-2 bg-white dark:bg-gray-900 dark:text-white shadow dark:outline outline-1 outline-gray-500">
                <div className="w-full">
                    <p className="text-2xl font-bold flex items-center gap-1">
                        <span>{exerciseName}</span>
                    </p>
                    {dateDisplay && (
                        <Subheader content={dateDisplay} />
                    )}
                    {muscles.map(m => {
                        return (
                            <div key={m.id} className="flex gap-1">
                                <Badge label={m.name}></Badge>
                            </div>
                        )
                    })}
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-between items-center divide-x dark:divide-gray-500">
                            <span className="w-20 flex flex-col items-center">
                                <span className="text-2xl font-extrabold text-[#42bfec]">{weight}</span>
                                <span className="text-gray-700 text-xs dark:text-gray-300">kg</span>
                            </span>
                            <span className="w-20 flex flex-col items-center">
                                <span className="text-2xl font-extrabold text-[#42bfec]">{reps}</span>
                                <span className="text-gray-700 text-xs dark:text-gray-300">reps</span>
                            </span>
                            <span className="w-20 flex flex-col items-center">
                                <span className="text-2xl font-extrabold text-[#42bfec]">{sets}</span>
                                <span className="text-gray-700 text-xs dark:text-gray-300">sets</span>
                            </span>
                        </div>
                    </div>

                    <section className="my-2">
                        <section className="flex items-center gap-2 py-2">
                            <span>メモ</span>
                            {!isEditMode && <PencilSquareIcon onClick={enablEeditMode} className="w-6 h-6 inline cursor-pointer"></PencilSquareIcon>}
                        </section>
                        {isEditMode && <EditNoteForm note={newNote || ""} setNote={(e) => setNewNote(e.target.value)} submit={() => void onSubmit()} cancel={() => onCancel()}></EditNoteForm>}
                        {!isEditMode && note && (
                            <>
                                <p className="rounded bg-gray-200 dark:bg-gray-700 dark:text-white p-4">{note}</p>
                            </>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
};
