"use client";

import { useParams, useRouter } from "next/navigation";
import { Dropdown, Heading, Navigation, WorkoutMenu } from "../../../components";
import { WorkoutMenuItemProps } from "../../../components/types";
import { api } from "../../../utils/api";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const ids = params?.id || "";
    const workoutMenuId = (Array.isArray(ids) ? ids[0] : ids) || "-1";

    const { data } = api.workoutMenu.getWorkoutMenuById.useQuery({ id: workoutMenuId });
    const { data: exerciseMaster } = api.exercise.getAll.useQuery();

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
            isSelected: false
        }
    });

    const removeMenu = async () => {
        if(data)
            await mutation.mutateAsync({id: data.id});
    };

    return (<>
        <main className="mt-4">
            <Heading />
            <Navigation />
            <div className="grid md:grid-cols-12">
                <div className="md:col-span-6 md:col-start-4 p-2 flex flex-col gap-2">
                    <div className="dark:text-white flex items-center justify-between">
                        <span className="text-lg">{data?.title}</span>
                        <Dropdown>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                <li onClick={() => void removeMenu()} className="block px-6 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white">
                                    削除
                                </li>
                            </ul>
                        </Dropdown>
                    </div>
                    <WorkoutMenu exercises={displayExercises} handleExerciseClick={(exerciseId: number, bodyPartId: number) => { router.push(`/workout/recorder?exerciseId=${exerciseId}&bodyPartId=${bodyPartId}`) }} />
                </div>
            </div>
        </main>
    </>);
}