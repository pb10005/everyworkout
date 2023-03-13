import * as React from "react";
import { useState, memo, useCallback } from "react";
import { Badge } from "../components/Badge";
import { api } from "../utils/api";

type Props = {
  selectedExerciseId: number;
  handleExerciseClick: (exerciseId: number) => void;
};

const MuscleList = (props) => {
  const { muscleId, muscles, handleMuscleClick } = props;
  return (
    <>
      <div className="mb-2 py-2">
        {muscles?.map((d) => (
          <Badge
            onClick={() => handleMuscleClick(d.id)}
            key={d.id}
            label={(d.id === muscleId ? "✔" : "") + d.name}
          ></Badge>
        ))}
      </div>
    </>
  );
};

const ExerciseList = (props) => {
  const { muscleId, selectedExerciseId, handleExerciseClick } = props;
  const exercises = api.exercise.getByMuscleId.useQuery({ muscleId }).data;
  return (
    <>
      <div className="mb-2 py-2">
        {exercises?.map((d) => (
          <Badge
            onClick={() => handleExerciseClick(d.exerciseId)}
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

  const { data } = api.muscle.getAll.useQuery();
  const muscles = data;
  const MemoMuscleList = memo(MuscleList);

  const handleMuscleClick = useCallback((muscleId) => {
    setMuscleId(muscleId);
  });
  return (
    <>
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
    </>
  );
};
