import * as React from "react";

type Props = {
  date?: Date | undefined;
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
      <div className="w-full flex justify-between rounded-lg p-2 bg-white shadow dark:bg-gray-900 dark:text-white dark:outline outline-1 outline-gray-500">
        <section>
          <p className="text-lg font-bold flex items-center gap-1">
            <span>{exerciseName}</span>
            <div className="inline-block w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-100 to-amber-500 shadow shadow-amber-500/50"></div>
          </p>
          {dateDisplay && (
            <p className="text-sm text-gray-700">{dateDisplay}</p>
          )}
        </section>
        <section>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold">{value}</span>
            <span className="text-xs text-gray-500">{unit}</span>
          </div>
        </section>
      </div>
    </>
  );
};
