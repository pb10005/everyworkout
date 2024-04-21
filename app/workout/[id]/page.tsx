"use client";
import type { ChangeEventHandler } from "react";
import { useRef, useState } from "react";
import { type NextPage } from "next";
import { useRouter, useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Script from 'next/script';

import { AuthShowcase, Button, Heading, Navigation, Loading, WorkoutCard } from "../../../src/components";
import { api } from "../../../src/utils/api";

type Props = {
  note: string;
  setNote: ChangeEventHandler<HTMLInputElement>;
  submit: () => void;
  cancel: () => void;
};

const WorkoutPage: NextPage = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  const ref = useRef<HTMLDivElement>(null);

  const ids = params?.id || "";
  const id = Array.isArray(ids) ? ids[0] : ids;

  const {
    data,
    isLoading: loadingGet,
    isSuccess: successGet,
  } = api.workout.getWorkoutById.useQuery({
    id: id || "",
  });

  const [metricsCode, setMetricsCode] = useState<string>("01");
  const mutation = api.maximum.add.useMutation();
  const deleteMutation = api.workout.delete.useMutation();

  const registerMaximum = async () => {
    await mutation
      .mutateAsync({
        exerciseId: data?.exerciseId || -1,
        date: data?.date.toISOString() || "",
        metrics_code: metricsCode,
        value:
          metricsCode === "01"
            ? data?.weight || 0
            : metricsCode === "02"
              ? data?.reps || 0
              : 0,
      })
      .catch(() => {
        return;
      });
  };
  const deleteWorkout = async () => {
    await deleteMutation.mutateAsync({
      id: id || ""
    });
  };

  return (
    <>
      <div className="mt-4">
        <Heading />
        <Navigation />
        <div>{!(loadingGet || successGet) && <AuthShowcase />}</div>
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-4 p-2 flex flex-col gap-2">
            {loadingGet && <Loading />}
            {mutation.isLoading && <Loading />}
            {mutation.isSuccess && (
              <>
                <p className="rounded-lg bg-green-100 p-4 text-green-900">
                  登録完了
                </p>
              </>
            )}
            {deleteMutation.isSuccess && (
              <>
                <p className="rounded-lg bg-green-100 p-4 text-green-900">
                  削除完了
                </p>
              </>
            )}
            {mutation.isError && (
              <>
                <p className="rounded-lg bg-red-100 p-4 text-red-900">
                  エラーが発生しました: {mutation.error.data?.path}
                </p>
              </>
            )}
            {successGet && (
              <>
                <section className="flex flex-col gap-4">
                  <div>
                    {data &&
                      <WorkoutCard
                        id={data?.id}
                        exerciseName={data?.exercise.name}
                        date={data?.date}
                        weight={data?.weight}
                        reps={data?.reps}
                        sets={data?.sets}
                        note={data.note}
                        muscles={data.exercise.muscles.map(m => m.muscle)}
                      />}
                  </div>
                  <section className="flex gap-1 items-center">
                    <a href="https://twitter.com/intent/tweet?hashtags=everyworkout"
                      className="twitter-hashtag-button p-4"
                      data-url={`${origin || ''}${pathname || ''}`}
                      data-show-count="false">
                      Tweet
                    </a>
                    <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload"></Script>
                    <span>
                      <Link className="dark:bg-gray-700 dark:text-white p-2 rounded-full" href={`/maximum/${data?.exerciseId}`}>この種目のトレーニング履歴へ</Link>
                    </span>
                  </section>
                  <section className="flex flex-col gap-2 p-2 rounded-lg dark:outline outline-1 outline-gray-500">
                    <div className="flex gap-2 items-center">
                      <label className="dark:text-gray-300" htmlFor="metrics">
                        指標
                      </label>
                      <select
                        name="metrics"
                        className="p-2 dark:bg-gray-700 dark:text-white dark:border-gray-500"
                        value={metricsCode}
                        onChange={(e) => setMetricsCode(e.target.value)}
                      >
                        <option value="01">重量</option>
                        <option value="02">reps</option>
                      </select>
                    </div>
                    {!mutation.isLoading && (
                      <Button onClick={() => void registerMaximum()} className="w-full">
                        Max記録登録
                      </Button>
                    )}
                    <label className="text-sm text-gray-700 dark:text-gray-300">削除</label>
                    {!deleteMutation.isLoading &&
                      <Button onClick={() => void deleteWorkout()} layout="danger" className="w-full">
                        削除
                      </Button>
                    }
                  </section>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkoutPage;
