"use client";

import Link from "next/link";
import { Loading, NoDataCard } from "../../components";
import { api } from "../../utils/api";

export function WorkoutMenuPage() {
    const { data: workoutMenus, isLoading } = api.workoutMenu.getUserWorkoutMenus.useQuery();

    return (<>
        <div className="">
            <p className="text-sm text-gray-500 dark:text-gray-200">あなたのトレーニングメニュー</p>
            {isLoading && <Loading />}
            {workoutMenus && workoutMenus?.length > 0 ? <>
                <div className="flex flex-col gap-1 divide-y bg-white dark:divide-gray-500 dark:bg-gray-900 dark:outline dark:outline-1 dark:outline-gray-500">
                    {workoutMenus?.map(wm => (<>
                        <Link key={wm.id} href={`/workout-menu/${wm.id}`} className="w-full px-4 py-2 dark:text-white">
                            {wm.title}
                        </Link>
                    </>))}
                </div>
            </> : <NoDataCard />}
        </div>
    </>);
}