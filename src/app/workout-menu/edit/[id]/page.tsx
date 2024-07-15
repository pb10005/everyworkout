"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading, WorkoutMenuEditor } from "../../../../components";
import { Heading, Navigation, Container } from "../../../../components/server";
import type { WorkoutMenuItemProps, WorkoutMenuSubmitProps } from "../../../../components/types";
import { api } from "../../../../utils/api";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const ids = params?.id || "";
    const workoutMenuId = (Array.isArray(ids) ? ids[0] : ids) || "-1";

    const [workoutMenu, setWorkoutMenu] = useState<WorkoutMenuItemProps[]>([]);

    const { data, isLoading, isSuccess } = api.workoutMenu.getWorkoutMenuById.useQuery({ id: workoutMenuId });
    const str = data?.exercisesJson;
    const workoutItems = (str ? JSON.parse(str) : []) as WorkoutMenuItemProps[];

    const { data: bodyParts } = api.bodyPart.getAll.useQuery();
    const { data: muscles } = api.muscle.getAllExercises.useQuery();
    const { data: exercises } = api.exercise.getAll.useQuery();

    const mutation = api.workoutMenu.update.useMutation({
        onSuccess() {
            router.push("/workout-menu");
        }
    })

    const handleSetWorkoutMenu = (menu: WorkoutMenuItemProps[]) => {
        setWorkoutMenu(menu);
    };

    const handleSubmit = async (data: WorkoutMenuSubmitProps) => {
        await mutation.mutateAsync({
            id: workoutMenuId,
            title: data.title,
            exercisesJson: JSON.stringify(data.exercises)
        });
    };

    useEffect(() => {
        setWorkoutMenu(workoutItems);
    }, [isSuccess]);

    return (
        <>
            <main className="md:mt-4">
                <Heading />
                <Navigation />
                <Container>
                    {isLoading ? <Loading /> :
                        <WorkoutMenuEditor bodyParts={bodyParts || []} muscles={muscles || []} exercises={exercises || []} title={data?.title} workoutMenu={workoutMenu} setWorkoutMenu={handleSetWorkoutMenu} submit={(data: WorkoutMenuSubmitProps) => void handleSubmit(data)} />
                    }
                </Container>
            </main>
        </>
    );
}
