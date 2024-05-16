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
    RecordCard,
    NoDataCard,
    Subheader,
    Dropdown,
} from "../../components";
import { DropdownItem } from "../../components/DropdownItem";
import { useRouter } from "next/navigation";

export const DashboardPage = () => {
    const router = useRouter();
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

    const {
        data: goal,
    } = api.goal.getCurrentUserGoal.useQuery();

    return (
        <>
            {(errorW && errorM && errorR) && <NotLoggedInCard />}
            <section>
                <section className="flex justify-between">
                <Subheader content="目標" />
                </section>
                {goal ? <>
                    <section key={goal.id} className="flex justify-between mx-1 px-2 py-4 bg-gray-100 rounded-lg dark:bg-gray-900 dark:outline outline-1 outline-gray-500 dark:text-white">
                        <div className="text-xl whitespace-pre-wrap">{goal.content}</div>
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
                </>: <NoDataCard />}
                <Link className="p-1 dark:text-white" href={`/goal/add`}>新規作成</Link>
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
                {loadingM && <Loading />}
                {successM && (
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
            <section>
                <Subheader content="トレーニング履歴" />
                {loadingW && <Loading />}
                {successW && (
                    <div>
                        <ListContainer>
                            {data?.length && data?.length > 0 ? data?.map((d) => {
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
                            }) : <NoDataCard />}
                        </ListContainer>
                        <Link className="p-1 dark:text-white" href="/workout/history">View More</Link>
                    </div>
                )}
            </section>
            <FloatingButton href="/workout/add">
                <PlusIcon className="w-10 h-10 text-white dark:text-gray-900"></PlusIcon>
            </FloatingButton>
        </>
    );
};
