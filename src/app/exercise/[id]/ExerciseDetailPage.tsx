"use client";

import { useParams } from "next/navigation";
import React from "react";
import { api } from "../../../utils/api";

import { MaximumCard, Loading, ExerciseChart, NoDataCard, ListContainer, Subheader } from "../../../components";
import { type ChartProp } from "../../../components/types";

export const ExerciseDetailPage: React.FC = () => {
    const params = useParams();

    const ids = params?.id || "";
    const exerciseId = (Array.isArray(ids) ? ids[0] : ids) || "-1";

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
                    <div className="w-full bg-white">
                        <ExerciseChart chartData={chartData} />
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
