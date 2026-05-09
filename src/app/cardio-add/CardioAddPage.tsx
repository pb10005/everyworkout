"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  ExerciseSelector,
  Loading,
} from "../../components";
import { api } from "../../utils/api";
import { useExerciseSelector } from "../../hooks/useExerciseSelector";
import { revalidate } from "../actions";

export const CardioAddPage: React.FC = () => {
  const router = useRouter();
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0] || ""
  );
  const [duration, setDuration] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  const { data: bodyParts } = api.bodyPart.getAll.useQuery();
  const { data: muscles } = api.muscle.getAllExercises.useQuery();
  const { data: exercises } = api.exercise.getAll.useQuery();

  const {
    selectedExerciseId,
    selectExerciseId,
    selectedBodyPartId,
    selectBodyPartId,
  } = useExerciseSelector(exercises || []);

  useEffect(() => {
    if (bodyParts) {
      const cardioBodyPart = bodyParts.find(bp => bp.name === '有酸素運動');
      if (cardioBodyPart) {
        selectBodyPartId(cardioBodyPart.id);
      }
    }
  }, [bodyParts, selectBodyPartId]);

  const mutation = api.workout.add.useMutation({
    async onSuccess({ id }) {
      await revalidate('/dashboard');
      return router.push(`/workout-detail?id=${id}`);
    },
  });

  const send = async () => {
    if (selectedExerciseId < 0) {
      setValidationError("種目を選んでください");
      return;
    }
    const durationInt = parseInt(duration);
    if (!duration || isNaN(durationInt) || durationInt <= 0) {
      setValidationError("時間（分）を正しく入力してください");
      return;
    }
    setValidationError("");
    await mutation
      .mutateAsync({
        date: new Date(date).toISOString(),
        reps: 0,
        sets: 0,
        note: note,
        exerciseId: selectedExerciseId,
        duration: durationInt,
        calories: calories ? parseFloat(calories) : undefined,
      })
      .catch(() => {
        return;
      });
  };

  const handleExerciseClick = useCallback((exerciseId: number) => {
    selectExerciseId(exerciseId);
  }, [selectExerciseId]);

  const handleBodyPartClick = (id: number) => {
    selectBodyPartId(id);
  };

  return (
    <div className="m-2 flex flex-col gap-2">
      {(mutation.isError || validationError) && (
        <p className="rounded-lg bg-red-100 p-4 text-red-900">
          {validationError || "エラーが発生しました。もう一度お試しください。"}
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
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
          種目
        </label>
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
      </div>
      <div className="grid gap-2">
        <label
          className="block text-sm font-bold text-gray-700 dark:text-gray-300"
          htmlFor="duration"
        >
          時間（分）
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                text-gray-700 shadow focus:outline-none
                dark:bg-gray-700 dark:text-white dark:border-gray-500"
          id="duration"
          type="number"
          min="1"
          placeholder="例: 30"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <label
          className="block text-sm font-bold text-gray-700 dark:text-gray-300"
          htmlFor="calories"
        >
          消費カロリー（kcal）（任意）
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
                text-gray-700 shadow focus:outline-none
                dark:bg-gray-700 dark:text-white dark:border-gray-500"
          id="calories"
          type="number"
          min="0"
          step="1"
          placeholder="例: 250"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
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
      {mutation.isLoading ? (
        <Loading />
      ) : (
        <Button onClick={() => void send()}>登録</Button>
      )}
    </div>
  );
};
