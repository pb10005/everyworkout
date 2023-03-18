import * as React from "react";
import Link from "next/link";

type Props = {
  date: Date | undefined;
  exerciseName: string | undefined;
  metrics_code: string;
  value: number | null;
};

export const MaximumCard: React.FC<Props> = (props: Props) => {
  const { date, exerciseName, metrics_code, value } = props;
  const dateDisplay = date
    ? new Date(date).toISOString().split("T")[0] || ""
    : "";
  const metrics_map: { [key: string]: string } = {
    "01": "kg",
    "02": "reps",
  };
  const unit = metrics_map[metrics_code];

  return (
    <>
      <div className=" mb-2 flex justify-between rounded-lg bg-amber-400 p-2 shadow-lg">
        <section>
          <p className="text-lg font-bold">
            <span>{exerciseName}</span>
          </p>
          {dateDisplay && (
            <p className="text-sm text-gray-700">{dateDisplay}</p>
          )}
        </section>
        <section>
          <p>
            <span className="text-3xl font-extrabold">{value}</span> {unit}
          </p>
        </section>
      </div>
    </>
  );
};
