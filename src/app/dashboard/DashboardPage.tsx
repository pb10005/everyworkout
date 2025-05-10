"use client";

import Link from "next/link";
import { api } from "../../utils/api";
import { ListBulletIcon, PlusIcon } from "@heroicons/react/20/solid";

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
    ExerciseChart,
    EmptyState
} from "../../components";
import { useRouter } from "next/navigation";
import type { ChartProp } from "../../components/types";
import type { Goal } from "@prisma/client";

type Props = {
    isEmptyData: boolean;
    userWorkoutVolumesInThisWeek: Partial<ChartProp>[];
    goal: Goal | null;
};

export const DashboardPage = (props: Props) => {
    const { isEmptyData, userWorkoutVolumesInThisWeek, goal } = props;
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


    return (
        <>
            {(errorM && errorR) && <NotLoggedInCard />}
            <section className="flex flex-col gap-2">
                <Subheader content="今週のトレーニング履歴" />
                <div className="dark:bg-black">
                    {!isEmptyData ? (
                        <ExerciseChart chartData={chartData} />
                    ) : (
                        <EmptyState 
                            message="今週のトレーニングデータがありません" 
                            description="トレーニングを記録して、グラフを表示しましょう"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            }
                        />
                    )}
                </div>
                <div className="flex">
                    <Link className="text-sm dark:bg-gray-700 dark:text-white px-4 py-2 rounded-full flex items-center gap-1" href="/workout/history">
                        <ListBulletIcon className="w-4 h-4"></ListBulletIcon>
                        <span>詳細を見る</span>
                    </Link>
                </div>
            </section>
            <section className="flex flex-col gap-2">
                <section className="flex justify-between">
                    <Subheader content="目標" />
                </section>
                {goal ? <>
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
                </> : <NoDataCard />}
                <div className="flex">
                    <Link className="text-sm dark:bg-gray-700 dark:text-white px-4 py-2 rounded-full flex items-center gap-1" href={`/goal/add`}>
                        <PlusIcon className="w-4 h-4"></PlusIcon>
                        <span>新規作成</span>
                    </Link>
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
