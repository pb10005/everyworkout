import * as React from "react";
import { useEffect, useRef, useState } from "react";

type Props = {
  date?: Date | undefined;
  exerciseName: string | undefined;
  metrics_code: string;
  value: number | null;
  removeMaximum?: () => void;
};

export const MaximumCard: React.FC<Props> = (props: Props) => {
  const { date, exerciseName, metrics_code, value, removeMaximum } = props;
  const [isDropdownVisible, setDrowpdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dateDisplay = date
    ? new Date(date).toISOString().split("T")[0] || ""
    : "";
  const metrics_map: { [key: string]: string } = {
    "01": "kg",
    "02": "reps",
  };
  const unit = metrics_map[metrics_code];

  const documentClickHandler = useRef((e: MouseEvent | TouchEvent) => { });

  const handleDropdownIconClicked = () => {
    if (isDropdownVisible) {
      document.removeEventListener('click', documentClickHandler.current)
      setDrowpdownVisible(false);
    } else {
      document.addEventListener('click', documentClickHandler.current)
      setDrowpdownVisible(true);
    }
  }

  useEffect(() => {
    documentClickHandler.current = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef?.current?.contains(e.target as Node)) return

      setDrowpdownVisible(false);
      document.removeEventListener('click', documentClickHandler.current)
    }
  }, [])

  return (
    <>
      <div className="w-full flex justify-between items-center p-2 bg-white dark:bg-gray-900 dark:text-white dark:outline outline-1 outline-gray-500">
        <section className="flex items-center gap-2">
          <section>
            <div className="text-lg font-bold flex items-center gap-1">
              <span>{exerciseName}</span>
            </div>
            {dateDisplay && (
              <p className="text-sm text-gray-700 dark:text-gray-300">{dateDisplay}</p>
            )}
          </section>
          <section>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-[#42bfec]">{value}</span>
              <span className="text-xs text-gray-700 dark:text-gray-300">{unit}</span>
            </div>
          </section>
        </section>
        {removeMaximum && <>
          <section className="relative">
            <button onClick={() => void handleDropdownIconClicked()} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>
            <div ref={dropdownRef} id="dropdownDots" className={`z-10 absolute right-0 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-500 cursor-pointer ${isDropdownVisible ? '' : 'hidden'}`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                <li onClick={() => void removeMaximum()} className="block px-6 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white">
                  削除
                </li>
              </ul>
            </div>
          </section>
        </>}
      </div>
    </>
  );
};
