import * as React from "react";
import { useState, memo, useCallback } from "react";
import { Badge, Loading } from "../components";
import { api } from "../utils/api";

type Props = {
  selectedExerciseId: number;
  handleExerciseClick: (exerciseId: number, exerciseName: string) => void;
};

type Muscle = {
  id: number;
  name: string;
};

type MuscleListProps = {
  muscleId: number;
  muscles: Muscle[] | undefined;
  handleMuscleClick: (muscleId: number) => void;
};

type ExerciseListProps = {
  muscleId: number;
  selectedExerciseId: number;
  handleExerciseClick: (exerciseId: number, exerciseName: string) => void;
};

const MuscleList = (props: MuscleListProps) => {
  const { muscleId, muscles, handleMuscleClick } = props;
  return (
    <>
      <div className="mb-2">
        {muscles?.map((d) => (
          <Badge
            onClick={() => handleMuscleClick(d.id)}
            key={d.id}
            label={`${d.id === muscleId ? "✔" : ""}${d.name}`}
          ></Badge>
        ))}
      </div>
    </>
  );
};

const ExerciseList = (props: ExerciseListProps) => {
  const { muscleId, selectedExerciseId, handleExerciseClick } = props;
  const { isLoading, isSuccess, data } = api.exercise.getByMuscleId.useQuery({ muscleId });
  return (
    <>
      <div>
        {isLoading && <Loading />}
        {isSuccess && data?.map((d) => (
          <Badge
            onClick={() => handleExerciseClick(d.exerciseId, d.exercise.name)}
            key={d.exerciseId}
            label={
              (d.exerciseId === selectedExerciseId ? "✔" : "") + d.exercise.name
            }
          />
        ))}
      </div>
    </>
  );
};

export const ExerciseSelector: React.FC<Props> = (props: Props) => {
  const { selectedExerciseId, handleExerciseClick } = props;
  const [muscleId, setMuscleId] = useState(-1);

  const { isLoading, isSuccess, data } = api.muscle.getAll.useQuery();
  const muscles = data;
  const MemoMuscleList = memo(MuscleList);

  const handleMuscleClick = useCallback((muscleId: number) => {
    setMuscleId(muscleId);
  }, []);
  return (
    <>
      {isLoading && <Loading />}
      {isSuccess && <>
        <MemoMuscleList
          muscleId={muscleId}
          muscles={muscles}
          handleMuscleClick={handleMuscleClick}
        />
        <ExerciseList
          muscleId={muscleId}
          selectedExerciseId={selectedExerciseId}
          handleExerciseClick={handleExerciseClick}
        />
      </>}

    </>
  );
};
