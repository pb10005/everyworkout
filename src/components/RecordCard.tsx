import * as React from "react";
import { Badge, Subheader } from "../components";

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
      <div className="grid cols-12 p-2 bg-white dark:bg-gray-900 dark:text-white">
        <div className="md:col-span-10 md:col-start-2">
          <p className="font-bold">
            {exerciseName}
          </p>
          <Subheader content={dateDisplay || ''} variant="subsection"/>
          {muscles.map(m => {
            return (
              <div key={m.id} className="flex gap-1">
                <Badge label={m.name}></Badge>
              </div>
            )
          })}
        </div>
        <div className="col-span-12 my-3">
          <div className="flex justify-center items-center gap-2 divide-x">
            <span className="w-20 flex flex-col items-center">
              <span className="text-2xl font-extrabold text-[#42bfec]">{weight}</span>
              <span className="text-gray-500 text-xs">kg</span>
            </span>
            <span className="w-20 flex flex-col items-center">
              <span className="text-2xl font-extrabold text-[#42bfec]">{reps}</span>
              <span className="text-gray-500 text-xs">reps</span>
            </span>
            <span className="w-20 flex flex-col items-center">
              <span className="text-2xl font-extrabold text-[#42bfec]">{sets}</span>
              <span className="text-gray-500 text-xs">sets</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
