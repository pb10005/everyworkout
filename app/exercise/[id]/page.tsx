"use client";

import { type NextPage } from "next";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useState } from "react";
import { api } from "../../../src/utils/api";
import { MinusCircleIcon } from "@heroicons/react/20/solid";

import { Heading, Navigation, MaximumCard, Loading, Button, ExerciseChart } from "../../../src/components";
import { type ChartProp } from "../../../src/components/types";

const History: NextPage = () => {
  const params = useParams();
  
  const ids = params?.id || "";
  const exerciseId = (Array.isArray(ids) ? ids[0] : ids) || "-1";

  const [isDeleteMode, setDeleteMode] = useState<boolean>(false);

  const { data, isLoading, isSuccess, isError, error } =
    api.maximum.getUserMaximumsByExerciseId.useQuery({
      exerciseId: parseInt(exerciseId),
    });

  const daily = api.workout.getUserWorkoutVolumeByExerciseId.useQuery({
    exerciseId: parseInt(exerciseId),
  });

  const test: Partial<ChartProp>[] = data?.map(x => {
    return {
      date: x.date.getTime(),
      maximum: x.value,
    }
  }) || [];

  const test2: Partial<ChartProp>[] = daily.data?.map(x => {
    return {
      date: x.date.getTime(),
      volume: x.totalVolume
    }
  }) || [];

  const chartData: Partial<ChartProp>[] = [
    ...test,
    ...test2,
  ];

  const mutation = api.maximum.delete.useMutation();

  const toggleDeleteMode = () => {
    setDeleteMode(!isDeleteMode);
  };

  const deleteMaximum = async (id: string) => {
    await mutation.mutateAsync({
      id
    });
  };

  return (
    <>
      <Heading />
      <Navigation />
      <div className="grid md:grid-cols-12 dark:bg-gray-900">
        <div className="md:col-span-6 md:col-start-4">
          <section className="mb-2 p-2">
            {mutation.isLoading && <Loading />}
            {mutation.isSuccess && (
              <>
                <p className="rounded-lg bg-green-100 p-4 text-green-900">
                  削除完了
                </p>
              </>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300">種目別グラフ</p>
            {isLoading && <Loading />}
            {isError && (
              <>
                <p className="rounded-lg bg-red-100 p-4 text-red-900">
                  エラーが発生しました: {error.data?.path}
                </p>
              </>
            )}
            {isSuccess && (<>
              <div className="w-full bg-white">
                <ExerciseChart chartData={chartData} />
              </div>
              <div className="mb-2 md:grid-span-3">
                <p className="text-sm text-gray-700 dark:text-gray-300 my-2">ベスト更新履歴</p>
                <Button onClick={toggleDeleteMode}>削除モード</Button>
              </div>
              <section className="grid md:grid-cols-3 gap-1">
                {data?.length && data?.length > 0
                  ? data?.map((d) => {
                    return (
                      <div key={d.id} className="md:grid-span-1 flex items-center">
                        {isDeleteMode ?
                          <MinusCircleIcon className="w-6 h-6 text-red-600 cursor-pointer" onClick={() => void deleteMaximum(d.id)}></MinusCircleIcon>
                          : ""}
                        <MaximumCard
                          date={d.date}
                          exerciseName={d.exercise.name}
                          metrics_code={d.metrics_code}
                          value={d.value}
                        />
                      </div>
                    );
                  })
                  : "No data"}
              </section></>
            )}
          </section>
        </div >
      </div >
    </>
  );
};

export default History;