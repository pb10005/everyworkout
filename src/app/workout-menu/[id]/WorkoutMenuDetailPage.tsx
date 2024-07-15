"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BackButton, Dropdown, Loading, WorkoutMenu } from "../../../components";
import { DropdownItem } from "../../../components/DropdownItem";
import type { WorkoutMenuItemProps } from "../../../components/types";
import { api } from "../../../utils/api";

export const WorkoutMenuDetailPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const ids = params?.id || "";
    const workoutMenuId = (Array.isArray(ids) ? ids[0] : ids) || "-1";

    const { data, isLoading, isSuccess } = api.workoutMenu.getWorkoutMenuById.useQuery({ id: workoutMenuId });
    const { data: exerciseMaster } = api.exercise.getAll.useQuery();

    const [currentDate] = useState(new Date().toISOString().split('T')[0]);
    const { data: todaysWorkouts } = api.workout.getUserWorkouts.useQuery({
        date: currentDate ? new Date(currentDate).toISOString() : undefined
    });

    const todaysWorkoutExerciseIdSet = new Set(todaysWorkouts?.map(tw => tw.exerciseId));

    const mutation = api.workoutMenu.delete.useMutation({
        onSuccess() {
            router.push('/workout-menu');
        }
    });

    const str = data?.exercisesJson;
    const exercises = (str ? JSON.parse(str) : []) as WorkoutMenuItemProps[];
    const displayExercises = exercises.map((e: WorkoutMenuItemProps) => {

        const data = exerciseMaster?.find(en => en.id === e.exerciseId);
        return {
            id: data?.id || -1,
            bodyPartId: e.bodyPartId || -1,
            name: data?.name || '',
            isSelected: todaysWorkoutExerciseIdSet.has(e.exerciseId)
        }
    });

    const removeMenu = async () => {
        if (data)
            await mutation.mutateAsync({ id: data.id });
    };

    return (<>
        <div className="flex flex-col gap-2">
            <BackButton>戻る</BackButton>
            {isLoading && <Loading />}
            {isSuccess && <>
                <div className="dark:text-white flex items-center justify-between">
                    <span className="text-lg px-2">{data?.title}</span>
                    <Dropdown>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                            <DropdownItem onClick={() => router.push(`/workout-menu/edit/${workoutMenuId}`)}>
                                <span className="dark:text-white">編集</span>
                            </DropdownItem><DropdownItem onClick={() => void removeMenu()}>
                                <span className="text-red-600">削除</span>
                            </DropdownItem>
                        </ul>
                    </Dropdown>
                </div>
                <WorkoutMenu exercises={displayExercises} handleExerciseClick={(exerciseId: number, bodyPartId: number) => { router.push(`/workout/recorder?exerciseId=${exerciseId}&bodyPartId=${bodyPartId}`) }} />
            </>}
        </div>
    </>);
}