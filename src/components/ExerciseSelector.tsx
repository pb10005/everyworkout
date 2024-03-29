"use client";
import * as React from "react";
import { Loading } from "../components";
import { api } from "../utils/api";
import { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

type Props = {
  selectedExerciseId: number;
  handleExerciseClick: (exerciseId: number, exerciseName: string) => void;
};

export const ExerciseSelector: React.FC<Props> = (props: Props) => {
  const { selectedExerciseId, handleExerciseClick } = props;
  const [selectedBodyPartId, selectBodyPartId] = useState<number>(-1);
  const { data: bodyParts, isLoading: isBodyPartLoading, isSuccess: bodyPartExists } = api.bodyPart.getAll.useQuery();
  const { data: muscles, isLoading: isMuscleLoading, isSuccess: muscleExists } = api.muscle.getExercisesByBodyPartId.useQuery({ bodyPartId: selectedBodyPartId });

  const handleBodyPartClick = (id: number) => {
    selectBodyPartId(id);
  };

  return (
    <>
      {(isBodyPartLoading || isMuscleLoading) && <Loading />}
      {selectedBodyPartId < 0 && bodyPartExists && <div className="gap-1 bg-white">
        <ul className="gap-1 divide-y">
          {bodyParts.map(bp => (
            <li className="p-2 cursor-poiner hover:bg-gray-200" key={bp.id} onClick={() => void handleBodyPartClick(bp.id)}>
              {bp.name}
            </li>
          ))
          }
        </ul>
      </div>}
      {selectedBodyPartId > 0 && muscleExists && <>
        <ChevronLeftIcon className="w-8 h-8 cursor-pointer" onClick={() => void selectBodyPartId(-1)} />
        <div className="gap-1 bg-white">
          {muscles.map(d => (
            <div className="p-2 rounded-lg" key={d.id}>
              <p className="text-sm text-gray-500">{d.name}</p>
              <ul className="gap-1 divide-y">
                {d.exercises.map(e =>
                  <li key={e.exercise.id} className={`p-2 cursor-poiner hover:bg-gray-200 ${e.exercise.id === selectedExerciseId ? 'bg-red-200' : ''}`} onClick={() => void handleExerciseClick(e.exercise.id, e.exercise.name)}>{e.exercise.name}</li>
                )}
              </ul>
            </div>
          ))
          }
        </div>
      </>}

    </>
  );
};
