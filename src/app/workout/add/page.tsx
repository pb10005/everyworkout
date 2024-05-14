"use client";
import { useState, useCallback } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/navigation";

import {
  Button,
  ExerciseSelector,
  Loading,
} from "../../../components";
import { Heading, Navigation, Container } from "../../../components/server";
import { api } from "../../../utils/api";

const AddWorkout: NextPage = () => {
  const router = useRouter();
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0] || ""
  );
  const [selectedExerciseId, selectExerciseId] = useState(-1);
  const [weight, setWeight] = useState<string>("50");
  const [reps, setReps] = useState<string>("10");
  const [sets, setSets] = useState<string>("3");
  const [note, setNote] = useState<string>("");
  const [selectedBodyPartId, selectBodyPartId] = useState<number>(-1);

  const { data: bodyParts } = api.bodyPart.getAll.useQuery();
  const { data: muscles } = api.muscle.getExercisesByBodyPartId.useQuery({ bodyPartId: selectedBodyPartId });

  const mutation = api.workout.add.useMutation();
  const send = async () => {
    await mutation
      .mutateAsync({
        date: new Date(date).toISOString(),
        weight: parseFloat(weight),
        reps: parseInt(reps),
        sets: parseInt(sets),
        note: note,
        exerciseId: selectedExerciseId,
      })
      .then(({ id }) => {
        return router.push(`/workout/${id}`);
      })
      .catch(() => {
        return;
      });
  };
  const handleExerciseClick = useCallback((exerciseId: number) => {
    selectExerciseId(exerciseId);
  }, []);

  const handleBodyPartClick = (id: number) => {
    selectBodyPartId(id);
  };

  return (
    <>
      <main className="mt-4">
        <Heading />
        <Navigation />
        <Container>
            {mutation.isLoading && <Loading />}
            {mutation.isError && (
              <p className="rounded-lg bg-red-100 p-4 text-red-900">
                エラーが発生しました: {mutation.error.data?.path}
              </p>
            )}
            <div className="grid gap-2">
              <label
                className="block text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="date"
              >
                日付
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                  text-gray-700 shadow focus:outline-none
                  dark:bg-gray-700 dark:text-white dark:border-gray-500"
                id="date"
                type="date"
                placeholder="日付"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                種目
              </label>
              {bodyParts && muscles && <ExerciseSelector
                selectedExerciseId={selectedExerciseId}
                selectedBodyPartId={selectedBodyPartId}
                bodyParts={bodyParts}
                muscles={muscles}
                handleExerciseClick={handleExerciseClick}
                handleBodyPartClick={handleBodyPartClick}
              />}
            </div>
            <div className="">
              <label
                className="block text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="weight"
              >
                重量
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                  text-gray-700 shadow focus:outline-none
                  dark:bg-gray-700 dark:text-white dark:border-gray-500"
                id="weight"
                type="number"
                step="2.5"
                placeholder="重量"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label
                className="block text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="reps"
              >
                rep数
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                  text-gray-700 shadow focus:outline-none
                  dark:bg-gray-700 dark:text-white dark:border-gray-500"
                id="reps"
                type="number"
                placeholder="rep数"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </div>
            <div className="">
              <label
                className="block text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="sets"
              >
                セット数
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                  text-gray-700 shadow focus:outline-none
                  dark:bg-gray-700 dark:text-white dark:border-gray-500"
                id="sets"
                type="number"
                placeholder="セット数"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label
                className="block text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="note"
              >
                メモ
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                  text-gray-700 shadow focus:outline-none
                  dark:bg-gray-700 dark:text-white dark:border-gray-500"
                id="note"
                type="text"
                placeholder="メモ"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            {!mutation.isLoading && (
              <Button onClick={() => void send()}>登録</Button>
            )}
          </Container>
      </main>
    </>
  );
};

export default AddWorkout;
