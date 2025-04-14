"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  return (<>
    <section className="p-2">
      <Subheader content="種目別トレーニング履歴" />
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
      <Button className="mx-2" onClick={() => router.push(`/search/${selectedExerciseId}`)}>
        検索
      </Button>
    )
    }
  </>);
};
