import * as React from "react";
import Link from "next/link";

type Exercise = {
  exerciseId: number;
  name: string;
};
type Props = {
  exercise: Exercise | undefined;
  metrics_code: string;
  value: number | null;
};

export const MaximumCard: React.FC<Props> = (props: Props) => {
  const { exercise, metrics_code, value } = props;
  const metrics_map: { [key: string]: string } = {
    "01": "kg",
    "02": "reps",
  };
  const unit = metrics_map[metrics_code];

  return (
    <>
      <div className="mb-2 rounded-lg p-2 shadow-lg">
        <p className="font-bold">
          <span>{exercise?.name}</span>
        </p>
        <div className="p-2">
          <p>
            {value} {unit}
          </p>
        </div>
      </div>
    </>
  );
};
