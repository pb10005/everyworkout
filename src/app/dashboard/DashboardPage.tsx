"use client";

import Link from "next/link";
import { api } from "../../utils/api";
import { ListBulletIcon, PlusIcon, FireIcon, CalendarIcon, ScaleIcon, SparklesIcon } from "@heroicons/react/20/solid";

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
import { useEffect, useMemo, useState } from "react";
import type { ChartProp } from "../../components/types";
import type { Goal } from "@prisma/client";



type TourStep = {
    title: string;
    description: string;
    targetId: string;
};

type Props = {
    isEmptyData: boolean;
    userWorkoutVolumesInThisWeek: Partial<ChartProp>[];
    goal: Goal | null;
};

export const DashboardPage = (props: Props) => {
    const { isEmptyData, userWorkoutVolumesInThisWeek, goal } = props;
    const router = useRouter();
    const [tourOpen, setTourOpen] = useState(false);
    const [tourStepIndex, setTourStepIndex] = useState(0);

    const tourSteps = useMemo<TourStep[]>(() => ([
        { title: "統計", description: "ここで連続日数や今月の記録数を確認できます。", targetId: "tour-stats" },
        { title: "履歴グラフ", description: "週次のトレーニング推移を可視化できます。", targetId: "tour-chart" },
        { title: "目標", description: "達成したい目標を登録して継続につなげましょう。", targetId: "tour-goal" },
        { title: "記録を追加", description: "右下のボタンから素早く新規ワークアウトを追加できます。", targetId: "tour-add-workout" },
    ]), []);

    useEffect(() => {
        const done = localStorage.getItem("everyworkout-onboarding-v1");
        if (!done) {
            setTourOpen(true);
        }
    }, []);

    useEffect(() => {
        if (!tourOpen) return;
        const targetId = tourSteps[tourStepIndex]?.targetId;
        if (!targetId) return;
        const target = document.getElementById(targetId);
        target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [tourOpen, tourStepIndex, tourSteps]);

    const closeTour = () => {
        localStorage.setItem("everyworkout-onboarding-v1", "done");
        setTourOpen(false);
    };

    const currentStep = tourSteps[tourStepIndex];

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

    const { data: stats, isLoading: loadingStats } = api.workout.getTrainingStats.useQuery();

    const { data: aiSettings } = api.userSettings.get.useQuery();
    const { data: aiReviews, isLoading: loadingAiReviews } = api.ai.getUserAiReviews.useQuery(
      undefined,
      { enabled: aiSettings?.aiEnabled === true }
    );


    return (
        <>
            {(errorM && errorR) && <NotLoggedInCard />}
            <section id="tour-stats" className="flex flex-col gap-2">
                <Subheader content="トレーニング統計" variant="section"/>
                {loadingStats && <Loading />}
                {stats && (
                    <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg py-3 px-2">
                            <FireIcon className="w-6 h-6 text-orange-400 mb-1" />
                            <span className="text-2xl font-extrabold text-orange-400">{stats.streak}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 text-center">連続日数</span>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg py-3 px-2">
                            <CalendarIcon className="w-6 h-6 text-blue-400 mb-1" />
                            <span className="text-2xl font-extrabold text-blue-400">{stats.workoutsThisMonth}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 text-center">今月の記録数</span>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg py-3 px-2">
                            <Link href="/body-weight" className="flex flex-col items-center">
                                <ScaleIcon className="w-6 h-6 text-green-400 mb-1" />
                                <span className="text-xs font-bold text-green-400">体重記録</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 text-center">トラッキング</span>
                            </Link>
                        </div>
                    </div>
                )}
                {stats && stats.topExercises.length > 0 && (
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg px-4 py-3">
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">よくやる種目</p>
                        <ul className="flex flex-col gap-1">
                            {stats.topExercises.map((ex, i) => (
                                <li key={ex.exerciseId} className="flex items-center justify-between dark:text-white text-sm">
                                    <span>{i + 1}. {ex.name}</span>
                                    <span className="text-xs text-gray-400">{ex.count}回</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
            <section id="tour-chart" className="flex flex-col gap-2">
                <Subheader content="今週のトレーニング履歴" variant="section"/>
                <div>
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
                    <Link className="text-sm dark:bg-gray-700 dark:text-white px-4 py-2 rounded-full flex items-center gap-1" href="/workout-history">
                        <ListBulletIcon className="w-4 h-4"></ListBulletIcon>
                        <span>詳細を見る</span>
                    </Link>
                </div>
            </section>
            <section id="tour-goal" className="flex flex-col gap-2">
                <Subheader content="目標" variant="section"/>
                {goal ? <>
                    <section key={goal.id} className="flex justify-between mx-1 px-2 py-4 bg-gray-100 rounded-lg dark:bg-gray-900 dark:outline outline-1 outline-gray-500 dark:text-white">
                        <div className="text-xl whitespace-pre-wrap flex items-center">{goal.content}</div>
                        <Dropdown>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                <DropdownItem onClick={() => router.push(`/goal-edit?id=${goal.id}`)}>
                                    編集
                                </DropdownItem>
                                <DropdownItem onClick={() => router.push("/goal-history")}>
                                    過去の目標
                                </DropdownItem>
                            </ul>
                        </Dropdown>
                    </section>
                </> : <NoDataCard />}
                <div className="flex">
                    <Link className="text-sm dark:bg-gray-700 dark:text-white px-4 py-2 rounded-full flex items-center gap-1" href="/goal-add">
                        <PlusIcon className="w-4 h-4"></PlusIcon>
                        <span>新規作成</span>
                    </Link>
                </div>
            </section>
            <section>
                <Subheader content="自己ベスト" variant="section"/>
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
                                            <Link href={`/exercise-detail?id=${m.exerciseId}`}>
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
                <Subheader content="週次レポート" variant="section"/>
                {loadingR && <Loading />}
                {successR && (
                    <>
                        <ListContainer>
                            {reports?.length && reports.length > 0
                                ? reports?.map(r => (
                                    <li key={r.id} className="py-2 px-4">
                                        <Subheader content={r.executeDate || ''} variant="subsection"/>
                                        <span className="dark:text-white">{r.content}</span>
                                    </li>)
                                )
                                : <NoDataCard />}
                        </ListContainer>
                    </>
                )}
            </section>
            {aiSettings?.aiEnabled && (
                <section>
                    <Subheader content="AIコーチからのレビュー" variant="section"/>
                    <div className="flex items-center gap-1 mb-2">
                        <SparklesIcon className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-purple-400">AI生成（毎週月曜更新）</span>
                    </div>
                    {loadingAiReviews && <Loading />}
                    {!loadingAiReviews && (
                        <ListContainer>
                            {aiReviews && aiReviews.length > 0
                                ? aiReviews.map(r => (
                                    <li key={r.id} className="py-2 px-4">
                                        <Subheader content={r.executeDate} variant="subsection"/>
                                        <span className="dark:text-white">{r.content}</span>
                                    </li>
                                ))
                                : <NoDataCard />}
                        </ListContainer>
                    )}
                </section>
            )}
            <FloatingButton href="/workout-add">
                <PlusIcon className="w-10 h-10 text-white dark:text-gray-900"></PlusIcon>
            </FloatingButton>
            </div>

            {tourOpen && currentStep && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 md:items-center">
                    <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl dark:bg-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                            オンボーディング {tourStepIndex + 1} / {tourSteps.length}
                        </p>
                        <h3 className="mt-1 text-lg font-bold dark:text-white">{currentStep.title}</h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{currentStep.description}</p>
                        <div className="mt-4 flex justify-between gap-2">
                            <button className="rounded-md px-3 py-2 text-sm text-gray-500" onClick={closeTour}>スキップ</button>
                            <button
                                className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white"
                                onClick={() => {
                                    if (tourStepIndex === tourSteps.length - 1) {
                                        closeTour();
                                        return;
                                    }
                                    setTourStepIndex((prev) => prev + 1);
                                }}
                            >
                                {tourStepIndex === tourSteps.length - 1 ? "開始する" : "次へ"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
