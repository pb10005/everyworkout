"use client";

import { Exercise } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Heading, Navigation, WorkoutMenu } from "../../../components";
import { api } from "../../../utils/api";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const ids = params?.id || "";
    const workoutMenuId = (Array.isArray(ids) ? ids[0] : ids) || "-1";

    const { data } = api.workoutMenu.getWorkoutMenuById.useQuery({ id: workoutMenuId });
    const { data: exerciseMaster } = api.exercise.getAll.useQuery();

    const str = data?.exercisesJson;
    const exercises = str ? JSON.parse(str) : [];
    const displayExercises = exercises.map((e: number) => {
        const data = exerciseMaster?.find(en => en.id === e);
        return {
            id: data?.id,
            name: data?.name,
            isSelected: false
        }
    });

    return (<>
        <main className="mt-4">
            <Heading />
            <Navigation />
            <div className="grid md:grid-cols-12">
                <div className="md:col-span-6 md:col-start-4 p-2 flex flex-col gap-2">
                    <span className="dark:text-white">{data?.title}</span>
                    <WorkoutMenu exercises={displayExercises} handleExerciseClick={(id: number) => {router.push(`/workout/recorder?exerciseId=${id}`)}} />
                </div>
            </div>
        </main>
    </>);
}