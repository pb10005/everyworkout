"use client";

import type { Exercise } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WorkoutMenuEditor } from "../../../components";
import { Heading, Navigation, Container } from "../../../components/server";
import type { WorkoutMenuItemProps, WorkoutMenuSubmitProps } from "../../../components/types";
import { api } from "../../../utils/api";

export default function Page() {
  const router = useRouter();

  const { data: bodyParts } = api.bodyPart.getAll.useQuery();
  const { data: muscles } = api.muscle.getAllExercises.useQuery();
  const { data: exercises } = api.exercise.getAll.useQuery();
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
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <WorkoutMenuEditor bodyParts={bodyParts || []} muscles={muscles || []} exercises={exercises || []} workoutMenu={workoutMenu} setWorkoutMenu={handleSetWorkoutMenu} submit={(data: WorkoutMenuSubmitProps) => void handleSubmit(data)} />
        </Container>
      </main>
    </>
  );
}
