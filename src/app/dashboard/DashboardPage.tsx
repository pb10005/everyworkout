"use client";

import Link from "next/link";
import { api } from "../../utils/api";
import { PlusIcon } from "@heroicons/react/20/solid";

import {
    FloatingButton,
    NotLoggedInCard,
    ListContainer,
    Loading,
    MaximumCard,
    NoDataCard,
    Subheader,
    Dropdown,
    DropdownItem,
    ExerciseChart
} from "../../components";
import { useRouter } from "next/navigation";
import type { ChartProp } from "../../components/types";
import { Suspense } from "react";

type Props = {
    userWorkoutVolumesInThisWeek: Partial<ChartProp>[];
};

export const DashboardPage = (props: Props) => {
    const { userWorkoutVolumesInThisWeek } = props;
    const router = useRouter();

    const chartData = userWorkoutVolumesInThisWeek.map(x => {
        return {
            date: x.date,
            cumulativeVolume: x.cumulativeVolume
        };
    });

    const {
        isLoading: loadingM,
        isSuccess: successM,
        isError: errorM,
        data: maximum,
    } = api.maximum.getUserMaximums.useQuery();

    const {
        isLoading: loadingR,
        isSuccess: successR,
        data: reports,
        isError: errorR,
    } = api.weeklyReport.getUserReports.useQuery();

    const {
        isLoading: loadingG,
        isSuccess: successG,
        data: goal,
    } = api.goal.getCurrentUserGoal.useQuery();

    return (
        <>
            {(errorM && errorR) && <NotLoggedInCard />}
            <section className="flex flex-col gap-2">
                <Subheader content="今週のトレーニング履歴" />
                <Suspense fallback={<Loading />}>
                    <div className="dark:bg-black">
                        <ExerciseChart chartData={chartData} />
                    </div>
                </Suspense>
                <div>
                    <Link className="text-sm dark:bg-gray-700 dark:text-white px-4 py-2 rounded-full" href="/workout/history">詳細を見る</Link>
                </div>
            </section>
            <section className="flex flex-col gap-2">
                <section className="flex justify-between">
                    <Subheader content="目標" />
                </section>
                {loadingG && <Loading />}
                {successG && (goal ? <>
                    <section key={goal.id} className="flex justify-between mx-1 px-2 py-4 bg-gray-100 rounded-lg dark:bg-gray-900 dark:outline outline-1 outline-gray-500 dark:text-white">
                        <div className="text-xl whitespace-pre-wrap flex items-center">{goal.content}</div>
                        <Dropdown>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                <DropdownItem onClick={() => router.push(`/goal/edit/${goal.id}`)}>
                                    編集
                                </DropdownItem>
                                <DropdownItem onClick={() => router.push("/goal/history")}>
                                    過去の目標
                                </DropdownItem>
                            </ul>
                        </Dropdown>
                    </section>
                </> : <NoDataCard />)}
                <div>
                    <Link className="text-sm dark:bg-gray-700 dark:text-white px-4 py-2 rounded-full" href={`/goal/add`}>新規作成</Link>
                </div>
            </section>
            <section>
                <Subheader content="自己ベスト" />
                {loadingM && <Loading />}
                {successM && (
                    <>
                        <ListContainer>
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
                                : <NoDataCard />}
                        </ListContainer>
                    </>
                )}
            </section>
            <section>
                <Subheader content="週次レポート" />
                {loadingR && <Loading />}
                {successR && (
                    <>
                        <ListContainer>
                            {reports?.length && reports.length > 0
                                ? reports?.map(r => (
                                    <li key={r.id} className="py-2 px-4">
                                        <Subheader content={r.executeDate || ''} />
                                        <span className="dark:text-white">{r.content}</span>
                                    </li>)
                                )
                                : <NoDataCard />}
                        </ListContainer>
                    </>
                )}
            </section>
            <FloatingButton href="/workout/add">
                <PlusIcon className="w-10 h-10 text-white dark:text-gray-900"></PlusIcon>
            </FloatingButton>
        </>
    );
};
