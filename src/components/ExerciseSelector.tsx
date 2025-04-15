"use client";
import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type { BodyPart, Muscle, Exercise } from "@prisma/client";
import { ListContainer } from "./ListContainer";
import { Subheader } from "./Subheader";

export interface ExerciseSelectorProps {
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
}

export const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
  selectedExerciseId,
  selectedBodyPartId,
  bodyParts,
  muscles,
  handleExerciseClick,
  handleBodyPartClick
}) => {
  const selectedExercise = muscles.flatMap(m => m.exercises).find(e => e.exercise.id === selectedExerciseId)?.exercise.name || '';

  const displayMuscles = muscles.filter(m => m.bodyPartId === selectedBodyPartId);

  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
      {
        selectedBodyPartId < 0 && (
          <>
            <Subheader content="部位を選択" variant="section" />
            <div className="mt-2">
              <ListContainer variant="interactive">
                {bodyParts.map(bp => (
                  <li 
                    key={bp.id} 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => void handleBodyPartClick(bp.id)}
                  >
                    <span className="font-medium dark:text-white">{bp.name}</span>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                  </li>
                ))}
              </ListContainer>
            </div>
          </>
        )
      }
      {
        selectedBodyPartId > 0 && (
          <>
            {selectedExerciseId > 0 ? (
              <>
                <button 
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors duration-150 mb-3 group"
                  onClick={() => void handleExerciseClick(-1, '')}
                >
                  <ChevronLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                  <span className="text-sm font-medium">種目選択へ戻る</span>
                </button>
                <div className="text-lg font-semibold text-gray-900 dark:text-white p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                  {selectedExercise || ''}
                </div>
              </>
            ) : (
              <>
                <button 
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors duration-150 mb-3 group"
                  onClick={() => void handleBodyPartClick(-1)}
                >
                  <ChevronLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                  <span className="text-sm font-medium">部位選択へ戻る</span>
                </button>
                <div className="space-y-4">
                  {displayMuscles.map(d => (
                    <div key={d.id}>
                      <Subheader content={d.name} variant="subsection" />
                      <ListContainer variant="interactive">
                        {d.exercises.map(e => (
                          <li 
                            key={e.exercise.id}
                            className={`transition-colors duration-200 ${
                              e.exercise.id === selectedExerciseId 
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-white font-medium' 
                                : ''
                            }`}
                            onClick={() => void handleExerciseClick(e.exercise.id, e.exercise.name)}
                          >
                            {e.exercise.name}
                          </li>
                        ))}
                      </ListContainer>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )
      }
    </div>
  );
};
