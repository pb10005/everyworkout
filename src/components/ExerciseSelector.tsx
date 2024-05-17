"use client";
import * as React from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import type { BodyPart, Muscle, Exercise } from "@prisma/client";
import { ListContainer } from "./ListConteiner";
import { Subheader } from "./SubHeader";

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

  const muscle = muscles.find(m => m.bodyPartId === selectedBodyPartId);
  const selectedExercise = muscles.find(m => m.exercises.some(e => e.exercise.id === selectedExerciseId));

  const displayMuscles = muscles.filter(m => m.bodyPartId === selectedBodyPartId);

  return (
    <>
      <div className="rounded-lg dark:bg-gray-700 p-2">
        {
          selectedBodyPartId < 0 && <>
            <Subheader content="部位を選択" />
            <div className="gap-1 bg-white dark:bg-gray-700 dark:outline outline-1 outline-gray-500">
              <ListContainer>
                {bodyParts.map(bp => (
                  <li className="p-2 cursor-pointer hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-200 dark:text-white dark:hover:text-gray-700" key={bp.id} onClick={() => void handleBodyPartClick(bp.id)}>
                    {bp.name}
                  </li>
                ))
                }
              </ListContainer>
            </div>
          </>
        }
        {
          selectedBodyPartId > 0 && <>{
            selectedExerciseId > 0 ? (<>
              <section className="flex items-center gap-0 cursor-pointer" onClick={() => void handleExerciseClick(-1, '')}>
                <ChevronLeftIcon className="w-8 h-8 dark:text-white" />
                <span className="text-sm dark:text-white">種目選択へ</span>
              </section>
              <div className="text-lg dark:text-white">{ selectedExercise?.name || '' }</div>
            </>) : (<>
              <section className="flex items-center gap-0 cursor-pointer" onClick={() => void handleBodyPartClick(-1)}>
                <ChevronLeftIcon className="w-8 h-8 dark:text-white" />
                <span className="text-sm dark:text-white">部位選択へ</span>
              </section>
              <div className="gap-1 bg-white dark:bg-gray-700">
                {displayMuscles.map(d => (
                  <div className="rounded-lg" key={d.id}>
                    <Subheader content={d.name} />
                    <ListContainer>
                      {d.exercises.map(e =>
                        <li key={e.exercise.id}
                          className={`p-2 cursor-pointer hover:bg-gray-200 ${e.exercise.id === selectedExerciseId ? 'bg-red-400 dark:bg-red-400' : ''} dark:text-white dark:bg-gray-900 dark:hover:bg-gray-200 dark:hover:text-gray-700`}
                          onClick={() => void handleExerciseClick(e.exercise.id, e.exercise.name)}>
                          {e.exercise.name}
                        </li>
                      )}
                    </ListContainer>
                  </div>
                ))
                }
              </div>
            </>)
          }</>
        }
      </div>
    </>);
};

