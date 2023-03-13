import * as React from "react";
import Link from "next/link";

type Exercise = {
  name: string;
};

type Workout = {
  exercise: Exercise;
  weight: number;
  reps: number;
  sets: number;
  note: string;
};

type Props = {
  workout: Workout;
};

export const RecordCard: React.FC<Props> = (props: Props) => {
  const { workout } = props;
  const { id, exercise, weight, reps, sets, note } = workout;

  return (
    <>
      <div className="mb-2 rounded-lg p-2 shadow-lg">
        <p className="font-bold">
          <Link href={`/workout/${id}`}>{exercise.name}</Link>
        </p>
        <div className="p-2">
          <p>{weight} kg</p>
          <p>{reps} reps</p>
          <p>{sets} sets</p>
        </div>
        <p>メモ: {note}</p>
      </div>
    </>
  );
};
