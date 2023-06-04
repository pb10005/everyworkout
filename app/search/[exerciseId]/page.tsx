"use client";

import { type NextPage } from "next";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useState } from "react";
import { api } from "../../../src/utils/api";

import { Heading, Navigation, RecordCard, Loading, Paginator } from "../../../src/components";

const SearchByExerciseId: NextPage = () => {

  const params = useParams();
  console.log(params);
  const ids = params?.exerciseId || "";
  const exerciseId = Array.isArray(ids) ? ids[0] : ids;

  const [page, setPage] = useState<number>(0);
  const [perPage, _] = useState<number>(10);

  const { data, isLoading, isSuccess } =
    api.workout.getUserWorkouts.useQuery({
      exerciseId: parseInt(exerciseId || "-1"),
      skip: page * perPage,
      take: perPage,
    });

  const { data: tmp } = api.workout.getUserWorkoutsCount.useQuery({
    exerciseId: parseInt(exerciseId || "-1"),
  });

  const count = tmp || -1;
  const maxPage = count > 0 ? Math.ceil(count / perPage) : 0;


  return (
    <>
    <main className="h-screen bg-gray-50">
      <Heading />
      <Navigation />
      <div className="grid md:grid-cols-12">
        <div className="md:col-span-6 md:col-start-4">
          <section className="mb-2 p-2">
            <p className="text-sm text-gray-500">種目別トレーニング履歴</p>
            {count > 0 && (
              <Paginator
                className="mb-2"
                page={page}
                perPage={perPage}
                maxPage={maxPage}
                setPage={setPage}
              />)}
            {isLoading && <Loading />}
            {isSuccess && (
              <>
                {data?.length && data?.length > 0
                  ? data?.map((d) => {
                    return <RecordCard key={d.id}
                      id={d.id}
                      exerciseName={d.exercise.name}
                      date={d.date}
                      weight={d.weight}
                      reps={d.reps}
                      sets={d.sets}
                      note={d.note}
                      muscles={d.exercise.muscles.map(m => m.muscle)} />;
                  })
                  : "No data"}
              </>
            )}
          </section>
        </div>
      </div>
      </main>
    </>
  );
};

export default SearchByExerciseId;
