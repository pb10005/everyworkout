"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, ExerciseSelector } from "../../components";
import { api } from "../../utils/api";

export const SearchPage: React.FC = () => {
  const router = useRouter();
  const [selectedExerciseId, selectExerciseId] = useState<number>(-1);
  const [selectedBodyPartId, selectBodyPartId] = useState<number>(-1);

  const { data: bodyParts } = api.bodyPart.getAll.useQuery();
  const { data: muscles } = api.muscle.getExercisesByBodyPartId.useQuery({ bodyPartId: selectedBodyPartId });


  const handleExerciseClick = (id: number) => {
    selectExerciseId(id);
  };

  const handleBodyPartClick = (id: number) => {
    selectBodyPartId(id);
  };

  return (<>
    <section className="p-2">
      <p className="text-sm text-gray-500 dark:text-gray-300">種目別トレーニング履歴</p>
      {bodyParts && muscles && <ExerciseSelector
        selectedExerciseId={selectedExerciseId}
        selectedBodyPartId={selectedBodyPartId}
        bodyParts={bodyParts}
        muscles={muscles}
        handleExerciseClick={handleExerciseClick}
        handleBodyPartClick={handleBodyPartClick}
      />}
    </section>
    {selectedExerciseId > 0 && (
      <Button onClick={() => router.push(`/search/${selectedExerciseId}`)} layout="normal">
        検索
      </Button>
    )
    }
  </>);
};