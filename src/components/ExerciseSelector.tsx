import * as React from "react";
import { Loading } from "../components";
import { api } from "../utils/api";

type Props = {
  selectedExerciseId: number;
  handleExerciseClick: (exerciseId: number, exerciseName: string) => void;
};

export const ExerciseSelector: React.FC<Props> = (props: Props) => {
  const { selectedExerciseId, handleExerciseClick } = props;
  const { data, isLoading, isSuccess } = api.muscle.getAllExercises.useQuery();

  return (
    <>
      {isLoading && <Loading />}
      {isSuccess && <>
        <div className="gap-1">
          {data.map(d => (
            <div className="bg-white p-2 rounded-lg" key={d.id}>
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
