"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import { api } from "../../../utils/api";

import { MaximumCard, Loading, ExerciseChart, NoDataCard, ListContainer, Subheader } from "../../../components";
import { type ChartProp } from "../../../components/types";

export const ExerciseDetailPage: React.FC = () => {
    const params = useParams();

    const ids = params?.id || "";
    const exerciseId = (Array.isArray(ids) ? ids[0] : ids) || "-1";

    const [displayPeriod, setDisplayPeriod] = useState<string>('01');

    const { data, isLoading, isSuccess, isError, error } =
        api.maximum.getUserMaximumsByExerciseId.useQuery({
            exerciseId: parseInt(exerciseId),
            inThisWeek: displayPeriod === '01'
        });

    const { data: daily } = api.workout.getUserWorkoutVolumeByExerciseId.useQuery({
        exerciseId: parseInt(exerciseId),
        inThisWeek: displayPeriod === '01'
    });

    const test: Partial<ChartProp>[] = data?.map(x => {
        return {
            date: x.date.getTime(),
            maximum: x.value,
        }
    }) || [];

    const dailyVolumes: Partial<ChartProp>[] = daily?.map(x => {
        return {
            date: x.date.getTime(),
            volume: x.totalVolume
        }
    }) || [];

    function* cumulativeDaily() {
        let cumulative = 0;
        for (const v of dailyVolumes) {
            cumulative += v.volume || 0;
            yield { date: v.date, cumulativeVolume: cumulative };
        }
    }

    const chartData: Partial<ChartProp>[] = [
        ...test,
        ...Array.from(cumulativeDaily())
    ];

    const mutation = api.maximum.delete.useMutation({
        async onSuccess() {
            await utils.maximum.getUserMaximumsByExerciseId.invalidate();
            await utils.workout.getUserWorkoutVolumeByExerciseId.invalidate();
        }
    });
    const utils = api.useContext();

    const deleteMaximum = async (id: string) => {
        await mutation.mutateAsync({
            id
        });
    };

    const handleChangeDisplayPeriod = (value: string) => {
        setDisplayPeriod(value);
    };

    return (
        <>
            <section>
                {mutation.isLoading && <Loading />}
                {mutation.isSuccess && (
                    <>
                        <p className="rounded-lg bg-green-100 p-4 text-green-900">
                            削除完了
                        </p>
                    </>
                )}
                <Subheader content="種目別グラフ" />
                {isLoading && <Loading />}
                {isError && (
                    <>
                        <p className="rounded-lg bg-red-100 p-4 text-red-900">
                            エラーが発生しました: {error.data?.path}
                        </p>
                    </>
                )}
                {isSuccess && (<>
                    <div className="flex flex-col gap-2">
                        <div className="px-2 md:px-0">
                            <select
                                name="metrics"
                                className="w-full p-2 dark:bg-gray-700 dark:text-white dark:border-gray-500"
                                value={displayPeriod}
                                onChange={(e) => void handleChangeDisplayPeriod(e.target.value)}
                            >
                                <option value="01">今週</option>
                                <option value="02">全期間</option>
                            </select>
                        </div>
                        <div className="dark:bg-black">
                            <ExerciseChart chartData={chartData} />
                        </div>
                    </div>
                    <div className="mb-2 md:grid-span-3">
                        <Subheader content="ベスト更新履歴" />
                    </div>
                    <ListContainer>
                        {data?.length && data?.length > 0
                            ? data?.map((d) => {
                                return (
                                    <div key={d.id} className="flex items-center">
                                        <MaximumCard
                                            date={d.date}
                                            exerciseName={d.exercise.name}
                                            metrics_code={d.metrics_code}
                                            value={d.value}
                                            removeMaximum={() => void deleteMaximum(d.id)}
                                        />
                                    </div>
                                );
                            })
                            : <NoDataCard />}
                    </ListContainer>
                </>
                )}
            </section>
        </>
    );
};
