"use client";

import { type NextPage } from "next";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { Button, Heading, Navigation, ExerciseSelector } from "../../src/components";

const Search: NextPage = () => {
  const router = useRouter();
  const [selectedExerciseId, selectExerciseId] = useState<number>(-1);

  const handleExerciseClick = (id: number) => {
    selectExerciseId(id);
  };

  return (
    <>
      <main className="">
        <Heading />
        <Navigation />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-4 flex flex-col gap-2">
            <section className="p-2">
              <p className="text-sm text-gray-500 dark:text-gray-300">種目別トレーニング履歴</p>
              <ExerciseSelector
                selectedExerciseId={selectedExerciseId}
                handleExerciseClick={handleExerciseClick}
              />
            </section>
            {selectedExerciseId > 0 && (
              <Button onClick={() => router.push(`/search/${selectedExerciseId}`)} layout="normal">
                検索
              </Button>
            )
            }
          </div>
        </div>
      </main>
    </>
  );
};

export default Search;
