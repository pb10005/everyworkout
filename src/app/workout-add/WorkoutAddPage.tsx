"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Button,
  ExerciseSelector,
  Loading,
} from "../../components";
import { api } from "../../utils/api";
import { useExerciseSelector } from "../../hooks/useExerciseSelector";
import { revalidate } from "../actions";

export const WorkoutAddPage: React.FC = () => {
  const router = useRouter();
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0] || ""
  );
  const [weight, setWeight] = useState<string>("50");
  const [reps, setReps] = useState<string>("10");
  const [sets, setSets] = useState<string>("3");
  const [note, setNote] = useState<string>("");

  const { data: bodyParts } = api.bodyPart.getAll.useQuery();
  const { data: muscles } = api.muscle.getAllExercises.useQuery();
  const { data: exercises } = api.exercise.getAll.useQuery();

  const cardioBodyPartId = bodyParts?.find(bp => bp.name === '有酸素運動')?.id;
  const strengthBodyParts = bodyParts?.filter(bp => bp.name !== '有酸素運動') ?? [];
  const strengthMuscles = muscles?.filter(m => m.bodyPartId !== cardioBodyPartId) ?? [];

  const {
    selectedExerciseId,
    selectExerciseId,
    selectedBodyPartId,
    selectBodyPartId
  } = useExerciseSelector(exercises || []);

  const mutation = api.workout.add.useMutation({
    async onSuccess({ id }) {
      await revalidate('/dashboard');
      return router.push(`/workout-detail?id=${id}`);
    }
  });

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
      <div className="m-2 flex flex-col gap-2">
        <div className="flex justify-end">
          <Link
            href="/cardio-add"
            className="text-sm text-blue-500 border border-blue-200 dark:border-blue-800 px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            有酸素運動を記録する
          </Link>
        </div>
        {mutation.isError && (
          <p className="rounded-lg bg-red-100 p-4 text-red-900">
            エラーが発生しました。もう一度お試しください。
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
            bodyParts={strengthBodyParts}
            muscles={strengthMuscles}
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
        {mutation.isLoading ?
          <Loading />
          : <Button onClick={() => void send()}>登録</Button>
        }
      </div>
    </>
  );
};
