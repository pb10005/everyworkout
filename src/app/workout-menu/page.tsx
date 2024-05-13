"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Heading, Navigation, Loading, FloatingButton } from "../../components";
import { api } from "../../utils/api";

export default function Page() {
    const { data: workoutMenus, isLoading } = api.workoutMenu.getUserWorkoutMenus.useQuery();

    return (<>
        <main className="mt-4">
            <Heading />
            <Navigation />
            <FloatingButton href="/workout-menu/add">
                <PlusIcon className="w-10 h-10 text-white dark:text-gray-900"></PlusIcon>
            </FloatingButton>
            <div className="grid md:grid-cols-12">
                <div className="md:col-span-6 md:col-start-4 p-2 flex flex-col gap-2">
                    <p className="text-sm text-gray-500 dark:text-gray-200">あなたのトレーニングメニュー</p>
                    {isLoading && <Loading />}
                    {workoutMenus && workoutMenus?.length > 0 && <>
                        <div className="flex flex-col gap-1 divide-y bg-white dark:divide-gray-500 dark:bg-gray-900 dark:outline dark:outline-1 dark:outline-gray-500">
                            {workoutMenus?.map(wm => (<>
                                <Link key={wm.id} href={`/workout-menu/${wm.id}`} className="w-full px-4 py-2 dark:text-white">
                                    {wm.title}
                                </Link>
                            </>))}
                        </div>
                    </>}
                </div>
            </div>
        </main>
    </>);
}