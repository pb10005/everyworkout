"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import { api } from "../../../utils/api";

import { RecordCard, Loading, Paginator, NoDataCard } from "../../../components";
import Link from "next/link";

export const SearchResultPage: React.FC = () => {

    const params = useParams();
    const ids = params?.exerciseId || "";
    const exerciseId = Array.isArray(ids) ? ids[0] : ids;

    const [page, setPage] = useState<number>(0);
    const [perPage] = useState<number>(10);

    const { data, isLoading, isSuccess } =
        api.workout.getUserWorkouts.useQuery({
            exerciseId: parseInt(exerciseId || "-1"),
            skip: page * perPage,
            take: perPage,
        });

    const { data: tmp } = api.workout.getUserWorkoutsCount.useQuery({
        exerciseId: parseInt(exerciseId || "-1"),
    });

    const count = tmp || -1;
    const maxPage = count > 0 ? Math.ceil(count / perPage) : 0;

    return (
        <>
            <section>
                <p className="text-sm text-gray-500 dark:text-gray-300">種目別トレーニング履歴</p>
                {count > 0 && (
                    <Paginator
                        className="dark:text-gray-300"
                        page={page}
                        maxPage={maxPage}
                        setPage={setPage}
                    />)}
                {isLoading && <Loading />}
                {isSuccess && (
                    <>
                        <div className="flex flex-col divide-y dark:divide-gray-500 dark:outline outline-1 outline-gray-500">
                            {data?.length && data?.length > 0
                                ? data?.map((d) => {
                                    return <Link key={d.id} href={`/workout/${d.id}`}><RecordCard
                                        id={d.id}
                                        exerciseName={d.exercise.name}
                                        date={d.date}
                                        weight={d.weight}
                                        reps={d.reps}
                                        sets={d.sets}
                                        note={d.note}
                                        muscles={d.exercise.muscles.map(m => m.muscle)} /></Link>;
                                })
                                : <NoDataCard />}
                        </div>
                    </>
                )}
            </section>
        </>
    );
};
