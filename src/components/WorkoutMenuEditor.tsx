"use client";
import { MinusCircleIcon } from "@heroicons/react/20/solid";
import type { BodyPart, Exercise, Muscle } from "@prisma/client";
import React, { useState } from "react";
import { z, ZodError } from "zod";
import { useExerciseSelector } from "../hooks/useExerciseSelector";
import { Button } from "./Button";
import { ExerciseSelector } from "./ExerciseSelector";
import { ListContainer } from "./ListConteiner";
import type { WorkoutMenuItemProps, WorkoutMenuSubmitProps } from "./types";

type Props = {
    bodyParts: BodyPart[];
    muscles: (Muscle & { exercises: { exercise: Exercise }[] })[]
    exercises: Exercise[];
    workoutMenu: WorkoutMenuItemProps[];
    setWorkoutMenu: (menu: WorkoutMenuItemProps[]) => void;
    submit: (data: WorkoutMenuSubmitProps) => void;
};

const schema = z.object({
    title: z.string().nonempty('タイトルは必須項目です'),
    exercises: z
        .array(
            z.object({
                exerciseId: z.number(),
                bodyPartId: z.number()
            })
        )
        .min(1, '少なくとも1件の種目を選んでください'),
});
export const WorkoutMenuEditor: React.FC<Props> = (props: Props) => {
    const { bodyParts, muscles, exercises, workoutMenu, setWorkoutMenu, submit } = props;
    const [error, setError] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const {
        selectBodyPartId,
        selectedBodyPartId,
        selectExerciseId,
        selectedExerciseId,
    } = useExerciseSelector(exercises);

    const handleExerciseClick = (id: number) => {
        selectExerciseId(id);
    };

    const handleBodyPartClick = (id: number) => {
        selectBodyPartId(id);
    };

    const handleAddButtonClick = () => {
        setWorkoutMenu([...workoutMenu, { exerciseId: selectedExerciseId, bodyPartId: selectedBodyPartId }]);
        selectExerciseId(-1);
    };

    const displayMenu = workoutMenu.map(wm => {
        const e = exercises.find(e => e.id === wm.exerciseId);
        if (e) return e;
        else return;
    }).filter(x => !!x);

    const handleDeleteButtonClick = (indexToDelete: number) => {
        setWorkoutMenu(workoutMenu.filter((_, index) => index !== indexToDelete));
    };

    const handleSubmit = () => {
        const data = {
            title: title,
            exercises: workoutMenu,
        };
        setError("");

        try {
            schema.parse(data);
            submit(data);
        } catch (e: unknown) {
            if (e && e instanceof ZodError) {
                setError(e?.issues[0]?.message || "");
            }
        }
    };

    return (<>
        <div className="m-2 flex flex-col gap-2">
            {error && <p className="rounded-lg bg-red-100 p-4 text-red-900">
                エラーが発生しました: {error}
            </p>}
            <div className="grid gap-2">
                <label
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300"
                    htmlFor="note"
                >
                    タイトル
                </label>
                <input
                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
              text-gray-700 shadow focus:outline-none
              dark:bg-gray-700 dark:text-white dark:border-gray-500"
                    id="note"
                    type="text"
                    placeholder="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <label
                className="block text-sm font-bold text-gray-700 dark:text-gray-300"
            >
                種目を追加
            </label>
            <div className="rounded-lg dark:outline outline-1 outline-gray-500 p-2 flex flex-col gap-2">
                {bodyParts && muscles && <ExerciseSelector
                    selectedExerciseId={selectedExerciseId}
                    selectedBodyPartId={selectedBodyPartId}
                    bodyParts={bodyParts}
                    muscles={muscles}
                    handleExerciseClick={handleExerciseClick}
                    handleBodyPartClick={handleBodyPartClick}
                />}
                {selectedExerciseId > 0 && <Button onClick={handleAddButtonClick}>追加</Button>}
            </div>
            {displayMenu.length > 0 &&
                <ListContainer>
                    {displayMenu.map((e, index) => (<>
                        {
                            e &&
                            <li key={e.id} className="px-4 py-2 flex gap-2 items-center">
                                <MinusCircleIcon onClick={() => handleDeleteButtonClick(index)} className="text-red-600 cursor-pointer" width={25} height={25} />
                                <span className="dark:text-white">{e.name}</span>
                            </li>
                        }
                    </>))}
                </ListContainer>
            }
            <Button onClick={() => void handleSubmit()}>メニューを登録</Button>
        </div>
    </>);
};
