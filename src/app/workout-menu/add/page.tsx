"use client";

import { Exercise } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import { Heading, Navigation, WorkoutMenuEditor } from "../../../components";
import { WorkoutMenuSubmitProps } from "../../../components/types";
import { api } from "../../../utils/api";

type Props = {
  note: string;
  setNote: ChangeEventHandler<HTMLInputElement>;
  submit: () => void;
  cancel: () => void;
};

export default function Page() {
  const router = useRouter();

  const { data } = api.exercise.getAll.useQuery();
  const exercises = data?.map((d: Exercise) => { return { id: d.id, name: d.name }; }) || [];
  const [workoutMenu, setWorkoutMenu] = useState<number[]>([]);

  const mutation = api.workoutMenu.add.useMutation({
    onSuccess() {
      router.push("/workout-menu");
    }
  })

  const handleSetWorkoutMenu = (menu: number[]) => {
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
            <WorkoutMenuEditor exercises={exercises} workoutMenu={workoutMenu} setWorkoutMenu={handleSetWorkoutMenu} submit={handleSubmit} />
          </div>
        </div>
      </main>
    </>
  );
}
