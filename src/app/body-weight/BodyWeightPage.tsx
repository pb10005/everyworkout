"use client";

import Link from "next/link";
import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { api } from "../../utils/api";
import { EmptyState, Loading, NoDataCard, Subheader } from "../../components";

const PERIOD_OPTIONS = [
  { label: "1ヶ月", days: 30 },
  { label: "3ヶ月", days: 90 },
  { label: "6ヶ月", days: 180 },
  { label: "1年", days: 365 },
];

export const BodyWeightPage: React.FC = () => {
  const [days, setDays] = useState(90);

  const { data: chartData, isLoading: chartLoading, refetch: refetchChart } =
    api.bodyWeight.getUserBodyWeightsForChart.useQuery({ days });

  const { data: list, isLoading: listLoading, refetch: refetchList } =
    api.bodyWeight.getUserBodyWeights.useQuery({ take: 20 });

  const deleteMutation = api.bodyWeight.delete.useMutation({
    onSuccess: () => {
      void refetchChart();
      void refetchList();
    },
  });

  const formattedChart = (chartData ?? []).map((r: { date: Date | string; weight: number }) => ({
    date: new Date(r.date).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" }),
    weight: r.weight,
  }));

  return (
    <section className="flex flex-col gap-4">
      <Subheader content="体重記録" variant="section" />

      {/* 期間切り替え */}
      <div className="flex gap-2 flex-wrap">
        {PERIOD_OPTIONS.map((opt) => (
          <button
            key={opt.days}
            onClick={() => setDays(opt.days)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              days === opt.days
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* グラフ */}
      {chartLoading && <Loading />}
      {!chartLoading && formattedChart.length === 0 && (
        <EmptyState
          message="まだ体重が記録されていません"
          description="体重を記録してグラフを表示しましょう"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          }
        />
      )}
      {!chartLoading && formattedChart.length > 0 && (
        <div className="dark:bg-gray-900 rounded-lg p-2">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={formattedChart} margin={{ top: 5, right: 15, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" fontSize={11} />
              <YAxis domain={["auto", "auto"]} unit="kg" fontSize={11} />
              <Tooltip formatter={(v: unknown) => [`${String(v)} kg`, "体重"]} />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#42bfec"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 記録一覧 */}
      <Subheader content="記録一覧" variant="subsection" />
      {listLoading && <Loading />}
      {!listLoading && (
        <ul className="flex flex-col gap-2">
          {list && list.length > 0 ? (
            list.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-900 rounded-lg dark:text-white"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-[#42bfec]">{r.weight} kg</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(r.date).toLocaleDateString("ja-JP")}
                  </span>
                  {r.note && <span className="text-sm mt-1">{r.note}</span>}
                </div>
                <button
                  onClick={() => deleteMutation.mutate({ id: r.id })}
                  className="p-2 text-red-400 hover:text-red-600"
                  aria-label="削除"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))
          ) : (
            <NoDataCard />
          )}
        </ul>
      )}

      {/* 追加ボタン */}
      <div className="flex">
        <Link
          href="/body-weight-add"
          className="flex items-center gap-1 text-sm px-4 py-2 rounded-full dark:bg-gray-700 dark:text-white"
        >
          <PlusIcon className="w-4 h-4" />
          体重を記録する
        </Link>
      </div>
    </section>
  );
};
