"use client";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import type { BodyPart, Exercise, Muscle } from "@prisma/client";
import React, { useState } from "react";
import { z, ZodError } from "zod";
import { useExerciseSelector } from "../hooks/useExerciseSelector";
import { Button } from "./Button";
import { ExerciseSelector } from "./ExerciseSelector";
import { ListContainer } from ".";
import { Subheader } from "./Subheader";
import type { WorkoutMenuItemProps, WorkoutMenuSubmitProps } from "./types";

type Props = {
    bodyParts: BodyPart[];
    muscles: (Muscle & { exercises: { exercise: Exercise }[] })[]
    exercises: Exercise[];
    title?: string;
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
    const { bodyParts, muscles, exercises, title: initialTitle, workoutMenu, setWorkoutMenu, submit } = props;
    const [error, setError] = useState<string>("");
    const [title, setTitle] = useState<string>(initialTitle || "");

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

    return (
        <div className="m-2 flex flex-col gap-4">
            {error && (
                <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-4 text-red-800 dark:text-red-300 flex items-center gap-2 shadow-sm border border-red-200 dark:border-red-800/50 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
            
            <div className="space-y-2">
                <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="menu-title"
                >
                    メニュータイトル
                </label>
                <input
                    className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition-colors duration-200 shadow-sm"
                    id="menu-title"
                    type="text"
                    placeholder="メニュータイトルを入力"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="mt-4">
                <Subheader content="種目を追加" variant="section" />
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-3 bg-white dark:bg-gray-800 shadow-sm">
                    {bodyParts && muscles && (
                        <ExerciseSelector
                            selectedExerciseId={selectedExerciseId}
                            selectedBodyPartId={selectedBodyPartId}
                            bodyParts={bodyParts}
                            muscles={muscles}
                            handleExerciseClick={handleExerciseClick}
                            handleBodyPartClick={handleBodyPartClick}
                        />
                    )}
                    {selectedExerciseId > 0 && (
                        <Button 
                            variant="primary" 
                            onClick={handleAddButtonClick}
                            className="mt-2"
                        >
                            <PlusCircleIcon className="w-5 h-5 mr-1" />
                            追加
                        </Button>
                    )}
                </div>
            </div>
            
            {displayMenu.length > 0 && (
                <div className="mt-4">
                    <Subheader content="選択した種目" variant="section" />
                    <ListContainer variant="with-icons">
                        {displayMenu.map((e, index) => (
                            e && (
                                <li key={e.id} className="flex items-center gap-3 group">
                                    <MinusCircleIcon 
                                        onClick={() => handleDeleteButtonClick(index)} 
                                        className="text-red-500 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 w-6 h-6" 
                                    />
                                    <span className="dark:text-white font-medium">{e.name}</span>
                                </li>
                            )
                        ))}
                    </ListContainer>
                </div>
            )}
            
            <Button 
                variant="primary" 
                onClick={() => void handleSubmit()}
                className="mt-4"
                size="lg"
            >
                メニューを登録
            </Button>
        </div>
    );
};
