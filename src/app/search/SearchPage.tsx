"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { Button, ExerciseSelector, Subheader } from "../../components";
import type { BodyPart, Exercise, Muscle } from "@prisma/client";

type Props = {
  bodyParts: BodyPart[];
  muscles: (Muscle & { exercises: { exercise: Exercise }[] })[];
};

export const SearchPage: React.FC<Props> = (props: Props) => {
  const { bodyParts, muscles } = props;

  const router = useRouter();
  const [selectedExerciseId, selectExerciseId] = useState<number>(-1);
  const [selectedBodyPartId, selectBodyPartId] = useState<number>(-1);

  const handleExerciseClick = (id: number) => {
    selectExerciseId(id);
  };

  const handleBodyPartClick = (id: number) => {
    selectBodyPartId(id);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">トレーニング履歴検索</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          種目を選択して、過去のトレーニング履歴を検索できます。
        </p>
      </div>
      
      <section>
        <Subheader content="種目を選択" variant="section" />
        <div className="mt-2">
          {bodyParts && muscles && (
            <ExerciseSelector
              selectedExerciseId={selectedExerciseId}
              selectedBodyPartId={selectedBodyPartId}
              bodyParts={bodyParts}
              muscles={muscles}
              handleExerciseClick={handleExerciseClick}
              handleBodyPartClick={handleBodyPartClick}
            />
          )}
        </div>
      </section>
      
      {selectedExerciseId > 0 && (
        <div className="mt-2">
          <Button 
            variant="primary" 
            size="lg"
            className="w-full md:w-auto"
            onClick={() => router.push(`/search/${selectedExerciseId}`)}
          >
            <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
            履歴を検索
          </Button>
        </div>
      )}
    </div>
  );
};
