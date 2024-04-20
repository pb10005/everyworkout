import * as React from "react";
import { useState } from "react";
import { EditNoteForm } from "./EditNoteForm";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

import { api } from "../utils/api";

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
            <div className="w-full flex justify-between rounded-lg p-2 bg-white shadow">
                <div className="w-full">
                    <p className="text-2xl font-bold flex items-center gap-1">
                        <span>{exerciseName}</span>
                    </p>
                    {dateDisplay && (
                        <p className="text-sm text-gray-700">{dateDisplay}</p>
                    )}
                    {muscles.map(m => {
                        return (
                            <div key={m.id} className="flex gap-1">
                                <span className="inline-block text-sm bg-gray-100 rounded-lg p-2">{m.name}</span>
                            </div>
                        )
                    })}
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center gap-2 divide-x">
                            <span className="w-20 flex flex-col items-center">
                                <span className="text-2xl font-extrabold text-[#42bfec]">{weight}</span>
                                <span className="text-gray-500 text-xs">kg</span>
                            </span>
                            <span className="w-20 flex flex-col items-center">
                                <span className="text-2xl font-extrabold text-[#42bfec]">{reps}</span>
                                <span className="text-gray-500 text-xs">reps</span>
                            </span>
                            <span className="w-20 flex flex-col items-center">
                                <span className="text-2xl font-extrabold text-[#42bfec]">{sets}</span>
                                <span className="text-gray-500 text-xs">sets</span>
                            </span>
                        </div>
                    </div>

                    <section className="my-2">
                        <p className="flex items-center py-2">
                            <span>メモ</span>
                            {!isEditMode && <PencilSquareIcon onClick={enablEeditMode} className="w-6 h-6 inline cursor-pointer"></PencilSquareIcon>}
                        </p>
                        {isEditMode && <EditNoteForm note={newNote || ""} setNote={(e) => setNewNote(e.target.value)} submit={() => void onSubmit()} cancel={() => onCancel()}></EditNoteForm>}
                        {!isEditMode && note && (
                            <>
                                <p className="rounded bg-gray-200 p-4">{note}</p>
                            </>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
};
