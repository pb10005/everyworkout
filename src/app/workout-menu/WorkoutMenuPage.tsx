"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { ListContainer, Loading, NoDataCard, Subheader, ToolList } from "../../components";
import { api } from "../../utils/api";

export function WorkoutMenuPage() {
    const { data: workoutMenus, isLoading } = api.workoutMenu.getUserWorkoutMenus.useQuery();

    return (<>
        <div className="">
            <section>
                <Subheader content="便利ツール" />
                <ToolList />
            </section>
            <Subheader content="あなたのトレーニングメニュー" />
            <section className="flex flex-col gap-2">
                <div className="flex justify-left">
                    <Link href="/workout-menu/add" className="flex items-center gap-1 text-sm dark:bg-gray-700 dark:text-white px-4 py-2 rounded-full">
                        <PlusIcon width={20} height={20} />
                        <span>新規作成</span>
                    </Link>
                </div>
                {isLoading && <Loading />}
                {!isLoading && <>
                    {workoutMenus && workoutMenus?.length > 0 ? <>
                        <ListContainer>
                            {workoutMenus?.map(wm => (<>
                                <Link key={wm.id} href={`/workout-menu/${wm.id}`} className="w-full px-4 py-2 dark:text-white">
                                    {wm.title}
                                </Link>
                            </>))}
                        </ListContainer>
                    </> : <NoDataCard />}
                </>}
            </section>
        </div>
    </>);
}