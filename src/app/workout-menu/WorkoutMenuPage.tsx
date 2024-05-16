"use client";

import Link from "next/link";
import { ListContainer, Loading, NoDataCard, Subheader } from "../../components";
import { api } from "../../utils/api";

export function WorkoutMenuPage() {
    const { data: workoutMenus, isLoading } = api.workoutMenu.getUserWorkoutMenus.useQuery();

    return (<>
        <div className="">
            <Subheader content="あなたのトレーニングメニュー" />
            {isLoading && <Loading />}
            {workoutMenus && workoutMenus?.length > 0 ? <>
                <ListContainer>
                    {workoutMenus?.map(wm => (<>
                        <Link key={wm.id} href={`/workout-menu/${wm.id}`} className="w-full px-4 py-2 dark:text-white">
                            {wm.title}
                        </Link>
                    </>))}
                </ListContainer>
            </> : <NoDataCard />}
        </div>
    </>);
}