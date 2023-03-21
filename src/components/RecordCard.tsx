import * as React from "react";
import Link from "next/link";

type Muscle = {
  id: number;
  name: string;
};

type Props = {
  id: string;
  exerciseName: string;
  date: Date;
  weight: number | null;
  reps: number;
  sets: number;
  note: string | null;
  muscles: Muscle[]
};

export const RecordCard: React.FC<Props> = (props: Props) => {
  const {
    id,
    exerciseName,
    date,
    weight,
    reps,
    sets,
    note,
    muscles
  } = props;
  const dateDisplay = date.toISOString().split("T")[0];
  return (
    <>
      <div className="mb-2 rounded-lg p-2 shadow-lg bg-white">
        <p className="font-bold">
          <Link href={`/workout/${id}`}>{exerciseName}</Link>
        </p>
        <div className="text-sm text-gray-500">{dateDisplay}</div>
        {muscles.map(m => {
          return (
            <div className="flex gap-1">
              <span key={m.id} className="inline-block text-sm bg-gray-100 rounded-lg p-2">{m.name}</span>
            </div>
          )
        })}
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
