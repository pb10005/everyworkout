"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { api } from "../../utils/api";

import { RecordCard, Loading, Paginator, NoDataCard, ListContainer, Subheader } from "../../components";

export const WorkoutHistoryPage: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const perPage = 10;
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0] || ""
  );
  const { data, isLoading, isSuccess } =
    api.workout.getUserWorkouts.useQuery({
      date: new Date(date).toISOString(),
      skip: page * perPage,
      take: perPage,
    });

  const { data: tmp } = api.workout.getUserWorkoutsCount.useQuery({
    date: new Date(date).toISOString(),
  });

  const { data: volume } = api.workout.getUserWorkoutVolume.useQuery({
    date: new Date(date).toISOString(),
  });

  const totalVolume = volume && (volume?.length > 0) ? volume[0]?.totalVolume : 0;

  const count = tmp || -1;
  const maxPage = count > 0 ? Math.ceil(count / perPage) : 0;

  const decrementDate = () => {
    const tmp = new Date(date);
    tmp.setDate(tmp.getDate() - 1);
    const dateString = tmp.toISOString().split("T")[0] || "";
    setDate(dateString);
  };

  const incrementDate = () => {
    const tmp = new Date(date);
    tmp.setDate(tmp.getDate() + 1);
    const dateString = tmp.toISOString().split("T")[0] || "";
    setDate(dateString);
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Subheader content="トレーニング履歴" variant="section"/>
        <a
          href="/api/export/workouts"
          download
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          CSV
        </a>
      </div>
      <div className="px-2">
        <label
          className="block text-sm font-bold text-gray-700 dark:text-gray-300"
          htmlFor="date"
        >
          日付を選択
        </label>
        <div className="flex justify-between items-center dark:text-white">
          <span onClick={() => decrementDate()} className="cursor-pointer"><ChevronLeftIcon className="inline w-8 h-8"></ChevronLeftIcon>前日</span>
          <span onClick={() => incrementDate()} className="cursor-pointer">翌日<ChevronRightIcon className="inline w-8 h-8"></ChevronRightIcon></span>
        </div>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
            text-gray-700 shadow focus:outline-none
            dark:bg-gray-700 dark:text-white dark:border-gray-500"
          id="date"
          type="date"
          placeholder="日付"
          value={date}
          onChange={(e) => { e.target.value && setDate(e.target.value) }}
        />
      </div>
      {isLoading && <Loading />}
      {isSuccess && (
        <>
          <div className="flex flex-col text-center py-2">
            <span className="text-3xl font-extrabold text-[#42bfec]">{totalVolume}</span>
            <span className="text-sm dark:text-gray-300">合計ボリューム</span>
          </div>
          {count > 0 && <Paginator
            className="dark:text-gray-300"
            page={page}
            maxPage={maxPage}
            setPage={setPage}
          />}
          <ListContainer>
            {data?.length && data?.length > 0
              ? data?.map((d) => {
                return <Link key={d.id} href={`/workout-detail?id=${d.id}`}><RecordCard
                  id={d.id}
                  exerciseName={d.exercise.name}
                  date={d.date}
                  weight={d.weight}
                  reps={d.reps}
                  sets={d.sets}
                  note={d.note}
                  muscles={d.exercise.muscles.map(m => m.muscle)}
                  duration={d.duration}
                  calories={d.calories}
                /></Link>;
              })
              : <NoDataCard />}
          </ListContainer>
        </>
      )}
    </section>
  );
};
