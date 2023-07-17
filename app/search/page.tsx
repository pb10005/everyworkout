"use client";

import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { Heading, Navigation, ExerciseSelector } from "../../src/components";

const Search: NextPage = () => {
  const [selectedExerciseId, selectExerciseId] = useState<number>(-1);

  const handleExerciseClick = (id: number) => {
    selectExerciseId(id);
  };

  return (
    <>
      <main className="h-screen bg-gray-100">
        <Heading />
        <Navigation />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-4">
            <section className="mb-2 p-2">
              <p className="text-sm text-gray-500">種目別トレーニング履歴</p>
              <ExerciseSelector
                selectedExerciseId={selectedExerciseId}
                handleExerciseClick={handleExerciseClick}
              />
            </section>
            {selectedExerciseId > 0 && (
              <Link href={`/search/${selectedExerciseId}`} className="bg-blue-100 hover:bg-white rounded-lg py-2 px-4">
                検索
              </Link>
            )
            }
          </div>
        </div>
      </main>
    </>
  );
};

export default Search;
