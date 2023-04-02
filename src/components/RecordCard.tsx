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
        <div className="flex justify-center items-center gap-2 divide-x">
          <span className="w-20 flex flex-col items-center">
            <span className="text-2xl font-extrabold">{weight}</span>
            <span className="text-gray-500 text-xs">kg</span>
          </span>
          <span className="w-20 flex flex-col items-center">
            <span className="text-2xl font-extrabold">{reps}</span>
            <span className="text-gray-500 text-xs">reps</span>
          </span>
          <span className="w-20 flex flex-col items-center">
            <span className="text-2xl font-extrabold">{sets}</span>
            <span className="text-gray-500 text-xs">sets</span>
          </span>
        </div>
        {muscles.map(m => {
          return (
            <div key={m.id} className="flex gap-1">
              <span className="inline-block text-sm bg-gray-100 rounded-lg p-2">{m.name}</span>
            </div>
          )
        })}
      </div>
    </>
  );
};
