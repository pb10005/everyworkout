"use client";

import Link from "next/link";
import { api } from "../../src/utils/api";
import { PlusIcon } from "@heroicons/react/20/solid";

import {
    FloatingButton,
    NotLoggedInCard,
    Loading,
    MaximumCard,
    RecordCard,
} from "../../src/components";

export const DashboardPage = () => {
    const {
        isLoading: loadingW,
        isSuccess: successW,
        isError: errorW,
        data,
    } = api.workout.getUserWorkouts.useQuery({
        take: 3,
    });
    const {
        isLoading: loadingM,
        isSuccess: successM,
        isError: errorM,
        data: maximum,
    } = api.maximum.getUserMaximums.useQuery();

    const {
        data: reports,
        isError: errorR,
    } = api.weeklyReport.getUserReports.useQuery();


    return (
        <>
            {(errorW && errorM && errorR) && <NotLoggedInCard />}
            <section className="p-2">
                <p className="text-sm text-gray-500 dark:text-gray-200">自己ベスト</p>
                {loadingM && <Loading />}
                {successM && (
                    <>
                        <section className="grid md:grid-cols-3 gap-1">
                            {maximum?.length && maximum?.length > 0
                                ? maximum?.map((m) => {
                                    return (
                                        <div
                                            key={`${m.exerciseId}${m.metrics_code}`}
                                            className="md:grid-span-1"
                                        >
                                            <Link href={`/exercise/${m.exerciseId}`}>
                                                <MaximumCard
                                                    exerciseName={m.exercise?.name}
                                                    metrics_code={m.metrics_code}
                                                    value={m.value}
                                                />
                                            </Link>
                                        </div>
                                    );
                                })
                                : "No data"}
                        </section>
                    </>
                )}
            </section>
            <section className="p-2">
                <p className="text-sm text-gray-500 dark:text-gray-200">週次レポート</p>
                {loadingM && <Loading />}
                {successM && (
                    <>
                        <ul className="gap-1 divide-y bg-white dark:divide-gray-500 dark:bg-gray-900 dark:outline outline-1 outline-gray-500">
                            {reports?.length && reports.length > 0
                                ? reports?.map(r => (
                                    <li key={r.id} className="py-2 px-4 flex items-center gap-2">
                                        <span className="text-sm text-gray-500 dark:text-gray-300">{r.executeDate || ''}</span>
                                        <span className="dark:text-white">{r.content}</span>
                                    </li>)
                                )
                                : "No data"}
                        </ul>
                    </>
                )}
            </section>
            <section className="p-2">
                <p className="text-sm text-gray-500 dark:text-gray-200">トレーニング履歴</p>
                {loadingW && <Loading />}
                {successW && (
                    <div>
                        <div className="grid gap-2">
                            {data?.length && data?.length > 0 ? (<>
                                <div className="grid divide-y dark:divide-gray-500 dark:outline outline-1 outline-gray-500">
                                    {data?.map((d) => {
                                        return <Link key={d.id} href={`/workout/${d.id}`}><RecordCard
                                            id={d.id}
                                            exerciseName={d.exercise.name}
                                            date={d.date}
                                            weight={d.weight}
                                            reps={d.reps}
                                            sets={d.sets}
                                            note={d.note}
                                            muscles={d.exercise.muscles.map(m => m.muscle)}
                                        /></Link>;
                                    })}
                                </div>
                                <Link className="dark:text-white" href="/workout/history">View More</Link>
                            </>) : "No data"}
                        </div>
                    </div>
                )}
            </section>
            <FloatingButton href="/workout/add">
                <PlusIcon className="w-10 h-10 text-white dark:text-gray-900"></PlusIcon>
            </FloatingButton>
        </>
    );
};