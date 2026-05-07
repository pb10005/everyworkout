"use client";

import { useState } from "react";
import { SparklesIcon } from "@heroicons/react/20/solid";
import { api } from "../../utils/api";
import { Loading, Subheader } from "../../components";

export const AiToolsPage = () => {
  const { data: aiSettings, isLoading: loadingSettings } = api.userSettings.get.useQuery();
  const [recommendExcludeDays, setRecommendExcludeDays] = useState(2);
  const [plateauWeeks, setPlateauWeeks] = useState(6);
  const recommendationQuery = api.ai.getTodayWorkoutRecommendation.useQuery({ excludeRecentDays: recommendExcludeDays }, { enabled: false });
  const plateauQuery = api.ai.detectPlateau.useQuery({ lookbackWeeks: plateauWeeks }, { enabled: false });
  const goalProgramMutation = api.ai.generateGoalProgram.useMutation();
  const [goal, setGoal] = useState("筋肥大");
  const [weeks, setWeeks] = useState(8);
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [equipment, setEquipment] = useState("ダンベル, バーベル");

  if (loadingSettings) return <Loading />;
  if (!aiSettings?.aiEnabled) return <p className="text-sm">AI機能は現在無効です。</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-purple-50 px-4 py-3 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-purple-500" />
          <h1 className="text-lg font-bold dark:text-white">AIコーチツール</h1>
        </div>
      </div>

      <section className="flex flex-col gap-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-900">
        <Subheader content="1) 今日のおすすめメニュー" variant="section" />
        <div className="flex items-center gap-2">
          <input type="number" min={0} max={14} value={recommendExcludeDays} onChange={(e) => setRecommendExcludeDays(Number(e.target.value))} className="w-20 rounded border px-2 py-1 text-sm" />
          <button className="rounded bg-purple-500 px-3 py-1 text-sm text-white" onClick={() => { void recommendationQuery.refetch(); }}>実行</button>
        </div>
        {recommendationQuery.data && <ul className="rounded bg-white p-3 text-sm dark:bg-gray-800 dark:text-white">{recommendationQuery.data.recommendations.map((item) => <li key={`${item.exerciseId}-${item.bodyPartId}`}>{item.exerciseName}（{item.bodyPartName}）</li>)}</ul>}
      </section>

      <section className="flex flex-col gap-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-900">
        <Subheader content="3) 停滞検知" variant="section" />
        <div className="flex items-center gap-2">
          <input type="number" min={2} max={12} value={plateauWeeks} onChange={(e) => setPlateauWeeks(Number(e.target.value))} className="w-20 rounded border px-2 py-1 text-sm" />
          <button className="rounded bg-purple-500 px-3 py-1 text-sm text-white" onClick={() => { void plateauQuery.refetch(); }}>実行</button>
        </div>
        {plateauQuery.data && <div className="rounded bg-white p-3 text-sm dark:bg-gray-800 dark:text-white"><p>{plateauQuery.data.summary}</p></div>}
      </section>

      <section className="flex flex-col gap-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-900">
        <Subheader content="6) 目標プラン生成" variant="section" />
        <input className="rounded border px-2 py-1 text-sm" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="目標" />
        <div className="flex gap-2">
          <input className="w-24 rounded border px-2 py-1 text-sm" type="number" value={weeks} min={2} max={24} onChange={(e) => setWeeks(Number(e.target.value))} />
          <input className="w-24 rounded border px-2 py-1 text-sm" type="number" value={daysPerWeek} min={2} max={7} onChange={(e) => setDaysPerWeek(Number(e.target.value))} />
        </div>
        <input className="rounded border px-2 py-1 text-sm" value={equipment} onChange={(e) => setEquipment(e.target.value)} placeholder="利用器具" />
        <button className="w-fit rounded bg-purple-500 px-3 py-1 text-sm text-white" onClick={() => { goalProgramMutation.mutate({ goal, weeks, daysPerWeek, equipment }); }}>生成</button>
        {goalProgramMutation.data && <pre className="overflow-auto rounded bg-white p-2 text-xs dark:bg-gray-800 dark:text-white">{JSON.stringify(goalProgramMutation.data.plan, null, 2)}</pre>}
      </section>
    </div>
  );
};
