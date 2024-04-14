"use client";

import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "../../src/utils/api";
import { PlusIcon } from "@heroicons/react/20/solid";


import {
  FloatingButton,
  Heading,
  Navigation,
  NotLoggedInCard,
  Loading,
  MaximumCard,
  RecordCard,
  ToolList,
} from "../../src/components";

const Dashboard: NextPage = () => {
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
    isLoading: loadingR,
    isSuccess: successR,
    isError: errorR,
    data: reports
  } = api.weeklyReport.getUserReports.useQuery();

  const dateDisplay = (date: Date) => {
    return date ? new Date(date).toISOString().split("T")[0] || ""
      : ""
  };

  return (
    <>
      <main className="h-screen bg-gray-100">
        <Heading />
        <Navigation />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-4">
            <section className="mb-2 p-2">
              <p className="text-sm text-gray-500">便利ツール</p>
              <ToolList />
            </section>
            <section className="mb-2 p-2">
              {loadingM && <Loading />}
              {(errorW && errorM) && <NotLoggedInCard />}
              {successM && (
                <>
                  <p className="text-sm text-gray-500">自己ベスト</p>
                  <section className="grid md:grid-cols-3 gap-1">
                    {maximum?.length && maximum?.length > 0
                      ? maximum?.map((m) => {
                        return (
                          <div
                            key={`${m.exerciseId}${m.metrics_code}`}
                            className="md:grid-span-1"
                          >
                            <Link href={`/maximum/${m.exerciseId}`}>
                              <MaximumCard
                                exerciseName={m.exercise?.name}
                                metrics_code={m.metrics_code}
                                value={m.value}
                              />
                            </Link>
                          </div>
                        );
                      })
                      : "No data"}
                  </section>
                </>
              )}
            </section>
            <section className="mb-2 p-2">
              <p className="text-sm text-gray-500">週次レポート</p>
              {loadingM && <Loading />}
              {(errorW && errorM) && <NotLoggedInCard />}
              {successM && (
                <>
                  <ul className="gap-1 divide-y bg-white">
                    {reports?.length && reports.length > 0
                      ? reports?.map(r => (
                        <li key={r.id} className="py-2 px-4 flex items-center gap-2">
                          <span className="text-sm text-gray-500">{dateDisplay(r.createdAt)}</span>
                          <span>{r.content}</span>
                        </li>)
                      )
                      : "No data"}
                  </ul>
                </>
              )}
            </section>
            <section className="mb-2 p-2">
              {loadingW && <Loading />}
              {successW && (
                <div>
                    <p className="text-sm text-gray-500">トレーニング履歴</p>
                    <div className="grid gap-2">
                      {data?.length && data?.length > 0 ? (<>
                        {data?.map((d) => {
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
                        })}
                        <Link href="/workout/history">View More</Link>
                      </>) : "No data"}
                    </div>
                </div>
              )}
            </section>
          </div>
          <FloatingButton href="/workout/add">
            <PlusIcon className="w-10 h-10 text-white"></PlusIcon>
          </FloatingButton>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
