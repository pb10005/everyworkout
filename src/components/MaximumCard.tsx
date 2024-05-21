import * as React from "react";
import Image from "next/image";
import { Dropdown } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";

type Props = {
  date?: Date | undefined;
  exerciseName: string | undefined;
  metrics_code: string;
  value: number | null;
  removeMaximum?: () => void;
};

export const MaximumCard: React.FC<Props> = (props: Props) => {
  const { date, exerciseName, metrics_code, value, removeMaximum } = props;

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
      <div className="w-full flex justify-between items-center p-2 bg-white dark:bg-gray-900 dark:text-white dark:outline outline-1 outline-gray-500">
        <section className="flex items-center gap-2">
          <Image src="/7233.png" alt="月桂樹" width={30} height={30} />
          <section>
            <div className="text-lg font-bold flex items-center gap-1">
              <span>{exerciseName}</span>
            </div>
            {dateDisplay && (
              <p className="text-sm text-gray-700 dark:text-gray-300">{dateDisplay}</p>
            )}
          </section>
        </section>
        <section className="flex items-center gap-2 justify-between">
          <section>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-[#42bfec]">{value}</span>
              <span className="text-xs text-gray-700 dark:text-gray-300">{unit}</span>
            </div>
          </section>
          {removeMaximum && <>
            <section className="relative">
              <Dropdown>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                  <DropdownItem onClick={() => void removeMaximum()}>
                    <span className="text-red-600">削除</span>
                  </DropdownItem>
                </ul>
              </Dropdown>
            </section>
          </>}
        </section>
      </div>
    </>
  );
};
