import * as React from "react";
import Link from "next/link";

type Exercise = {
  name: string;
};

type Workout = {
  id: string;
  date: Date;
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
  const { id, date, exercise, weight, reps, sets } = workout;
  const dateDisplay = new Date(date).toISOString().split("T")[0];
  return (
    <>
      <div className="mb-2 rounded-lg p-2 shadow-lg">
        <p className="font-bold">
          <Link href={`/workout/${id}`}>{exercise.name}</Link>
        </p>
        <div className="text-sm text-gray-500">{dateDisplay}</div>
        <div className="flex justify-center p-2 text-right">
          <span>
            <span className="text-2xl font-extrabold">{weight}</span>kg
          </span>
          <span className="mx-4">
            <span className="text-2xl font-extrabold">{reps}</span>reps
          </span>
          <span>
            <span className="text-2xl font-extrabold">{sets}</span>sets
          </span>
        </div>
      </div>
    </>
  );
};
