import * as React from "react";
import Link from "next/link";

type Exercise = {
  name: string;
};

type Workout = {
  id: string;
  exercise: Exercise;
  weight: number | null;
  reps: number;
  sets: number;
  note: string | null;
};

type Props = {
  workout: Workout & { exercise: Exercise };
};

export const RecordCard: React.FC<Props> = (props: Props) => {
  const { workout } = props;
  const { id, exercise, weight, reps, sets } = workout;

  return (
    <>
      <div className="mb-2 rounded-lg p-2 shadow-lg">
        <p className="font-bold">
          <Link href={`/workout/${id}`}>{exercise.name}</Link>
        </p>
        <div className="p-2">
          <span className="text-xl">{weight}</span> kg /
          <span className="text-xl">{reps}</span> reps /
          <span className="text-xl">{sets}</span> sets
        </div>
      </div>
    </>
  );
};
