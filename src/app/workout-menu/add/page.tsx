"use client";

import type { Exercise } from "@prisma/client";
import { useRouter } from "next/navigation";
import { type ChangeEventHandler, useState } from "react";
import { Heading, Navigation, WorkoutMenuEditor } from "../../../components";
import type { WorkoutMenuItemProps, WorkoutMenuSubmitProps } from "../../../components/types";
import { api } from "../../../utils/api";

export default function Page() {
  const router = useRouter();

  const { data } = api.exercise.getAll.useQuery();
  const exercises = data?.map((d: Exercise) => { return { id: d.id, name: d.name }; }) || [];
  const [workoutMenu, setWorkoutMenu] = useState<WorkoutMenuItemProps[]>([]);

  const mutation = api.workoutMenu.add.useMutation({
    onSuccess() {
      router.push("/workout-menu");
    }
  })

  const handleSetWorkoutMenu = (menu: WorkoutMenuItemProps[]) => {
    setWorkoutMenu(menu);
  };

  const handleSubmit = async (data: WorkoutMenuSubmitProps) => {
    await mutation.mutateAsync({
      title: data.title,
      exercisesJson: JSON.stringify(data.exercises)
    });
  };

  return (
    <>
      <main className="mt-4">
        <Heading />
        <Navigation />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-4 p-2 flex flex-col gap-2">
            <WorkoutMenuEditor exercises={exercises} workoutMenu={workoutMenu} setWorkoutMenu={handleSetWorkoutMenu} submit={(data: WorkoutMenuSubmitProps) => void handleSubmit(data)} />
          </div>
        </div>
      </main>
    </>
  );
}
