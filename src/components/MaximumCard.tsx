import * as React from "react";
import Link from "next/link";

type Exercise = {
  name: string;
};

type Maximum = {
  id: string;
  exercise: Exercise;
  metrics_code: string;
  value: number;
};

type Props = {
  maximum: Maximum & { exercise: Exercise };
};

export const MaximumCard: React.FC<Props> = (props: Props) => {
  const { maximum } = props;
  const { id, exercise, metrics_code, value } = maximum;
  const metrics_map: { [key: string]: string } = {
    "01": "kg",
    "02": "reps",
  };
  const unit = metrics_map[metrics_code];

  return (
    <>
      <div className="mb-2 rounded-lg p-2 shadow-lg">
        <p className="font-bold">
          <Link href={`/workout/${id}`}>{exercise.name}</Link>
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
