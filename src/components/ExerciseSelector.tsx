"use client";
import * as React from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import type { BodyPart, Muscle, Exercise } from "@prisma/client";

type Props = {
  selectedExerciseId: number;
  selectedBodyPartId: number;
  bodyParts: BodyPart[];
  muscles: (Muscle & {
    exercises: {
      exercise: Exercise;
    }[]
  })[];
  handleExerciseClick: (exerciseId: number, exerciseName: string) => void;
  handleBodyPartClick: (bodyPartId: number) => void;
};

export const ExerciseSelector: React.FC<Props> = (props: Props) => {
  const { selectedExerciseId, selectedBodyPartId, bodyParts, muscles, handleExerciseClick, handleBodyPartClick } = props;

  const displayMuscles = muscles.filter(m => m.bodyPartId === selectedBodyPartId);

  return (
    <>
      <div className="rounded-lg dark:bg-gray-700 p-2">
      {
        selectedBodyPartId < 0 &&
        <div className="gap-1 bg-white dark:bg-gray-700 dark:outline outline-1 outline-gray-500">
          <ul className="gap-1 divide-y dark:divide-gray-500">
            {bodyParts.map(bp => (
              <li className="p-2 cursor-pointer hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-200 dark:text-white dark:hover:text-gray-700" key={bp.id} onClick={() => void handleBodyPartClick(bp.id)}>
                {bp.name}
              </li>
            ))
            }
          </ul>
        </div>
      }
      {
        selectedBodyPartId > 0 && 
        <>
          <ChevronLeftIcon className="w-8 h-8 cursor-pointer dark:text-white" onClick={() => void handleBodyPartClick(-1)} />
          <div className="gap-1 bg-white dark:bg-gray-700">
            {displayMuscles.map(d => (
              <div className="rounded-lg" key={d.id}>
                <p className="text-sm text-gray-500 dark:text-gray-300">{d.name}</p>
                <ul className="divide-y dark:divide-gray-500 dark:outline outline-1 outline-gray-500">
                  {d.exercises.map(e =>
                    <li key={e.exercise.id}
                      className={`p-2 cursor-pointer hover:bg-gray-200 ${e.exercise.id === selectedExerciseId ? 'bg-red-400 dark:bg-red-400' : ''} dark:text-white dark:bg-gray-900 dark:hover:bg-gray-200 dark:hover:text-gray-700`}
                      onClick={() => void handleExerciseClick(e.exercise.id, e.exercise.name)}>
                      {e.exercise.name}
                    </li>
                  )}
                </ul>
              </div>
            ))
            }
          </div>
        </>
      }
      </div>
    </>
  );
};
