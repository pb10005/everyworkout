"use client";

import { useState } from "react";
import { SparklesIcon } from "@heroicons/react/20/solid";
import { api } from "../../utils/api";
import { Loading, Subheader } from "../../components";

const inputClass = "w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400";
const labelClass = "text-xs font-medium text-gray-500 dark:text-gray-400";

const clamp = (value: number, min: number, max: number, fallback: number): number => {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
};

type GoalPlan = {
  phases?: Array<{ name: string; weeks: string; focus: string }>;
  weeklyTemplate?: Array<{ day: number; focus: string; examples?: string[] }>;
  adjustmentRules?: string[];
};

const GoalPlanResult = ({ goal, weeks, daysPerWeek, plan }: {
  goal: string;
  weeks: number;
  daysPerWeek: number;
  plan: Record<string, unknown>;
}) => {
  const p = plan as GoalPlan;
  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-3">
        <p className="font-medium text-purple-700 dark:text-purple-300">{goal}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{weeks}週間 · 週{daysPerWeek}日</p>
      </div>

      {p.phases && p.phases.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">フェーズ</h4>
          <div className="flex flex-col gap-2">
            {p.phases.map((phase, i) => (
              <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium dark:text-white">{phase.name}</span>
                  <span className="text-xs whitespace-nowrap bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded">{phase.weeks}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{phase.focus}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {p.weeklyTemplate && p.weeklyTemplate.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">週間テンプレート</h4>
          <div className="flex flex-col gap-2">
            {p.weeklyTemplate.map((day, i) => (
              <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">Day {day.day}</span>
                  <span className="font-medium dark:text-white">{day.focus}</span>
                </div>
                {day.examples && day.examples.length > 0 && (
                  <ul className="mt-1.5 flex flex-col gap-0.5 pl-1">
                    {day.examples.map((ex, j) => (
                      <li key={j} className="text-xs text-gray-600 dark:text-gray-300 flex gap-1.5">
                        <span className="text-purple-400 flex-shrink-0">•</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {p.adjustmentRules && p.adjustmentRules.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">調整ルール</h4>
          <ul className="flex flex-col gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
            {p.adjustmentRules.map((rule, i) => (
              <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex gap-2">
                <span className="text-purple-400 flex-shrink-0">✓</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const AiToolsPage = () => {
  const { data: aiSettings, isLoading: loadingSettings } = api.userSettings.get.useQuery();
  const [recommendExcludeDays, setRecommendExcludeDays] = useState(2);
  const [plateauWeeks, setPlateauWeeks] = useState(6);

  const recommendationQuery = api.ai.getTodayWorkoutRecommendation.useQuery(
    { excludeRecentDays: recommendExcludeDays },
    { enabled: false }
  );
  const plateauQuery = api.ai.detectPlateau.useQuery(
    { lookbackWeeks: plateauWeeks },
    { enabled: false }
  );
  const goalProgramMutation = api.ai.generateGoalProgram.useMutation();
  const [goal, setGoal] = useState("");
  const [weeks, setWeeks] = useState(8);
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [equipment, setEquipment] = useState("");

  if (loadingSettings) return <Loading />;
  if (!aiSettings?.aiEnabled) return (
    <p className="text-sm text-gray-500 dark:text-gray-400 p-4">
      AI機能は現在無効です。プロフィールページから有効化を申請してください。
    </p>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-purple-50 px-4 py-3 dark:bg-purple-900/20">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-purple-500" />
          <h1 className="text-lg font-bold dark:text-white">AIコーチツール</h1>
        </div>
      </div>

      {/* 今日のおすすめメニュー */}
      <section className="flex flex-col gap-3 rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
        <Subheader content="今日のおすすめメニュー" variant="section" />
        <div className="flex flex-col gap-1">
          <label className={labelClass}>直近除外日数（この日数以内に行った部位を除外）</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={14}
              value={recommendExcludeDays}
              onChange={(e) => setRecommendExcludeDays(clamp(Number(e.target.value), 0, 14, 2))}
              className="w-24 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
              aria-label="直近除外日数"
            />
            <span className={labelClass}>日</span>
          </div>
        </div>
        <button
          className="w-fit rounded bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 active:scale-95 transition-all disabled:opacity-40"
          disabled={recommendationQuery.isFetching}
          onClick={() => { void recommendationQuery.refetch(); }}
        >
          {recommendationQuery.isFetching ? "取得中..." : "おすすめを表示"}
        </button>
        {recommendationQuery.isError && (
          <p className="text-sm text-red-500" role="alert">{recommendationQuery.error.message}</p>
        )}
        {recommendationQuery.data && (
          <div className="flex flex-col gap-2">
            <ul className="rounded bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {recommendationQuery.data.recommendations.map((item) => (
                <li key={`${item.exerciseId}-${item.bodyPartId}`} className="flex justify-between px-3 py-2 text-sm dark:text-white">
                  <span>{item.exerciseName}</span>
                  <span className="text-xs text-gray-400">{item.bodyPartName}</span>
                </li>
              ))}
            </ul>
            <ul className="text-xs text-gray-400 dark:text-gray-500 list-disc list-inside">
              {recommendationQuery.data.reasons.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        )}
      </section>

      {/* 停滞検知 */}
      <section className="flex flex-col gap-3 rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
        <Subheader content="停滞検知" variant="section" />
        <div className="flex flex-col gap-1">
          <label className={labelClass}>分析期間（週数で指定、最近N週間のデータを分析）</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={2}
              max={12}
              value={plateauWeeks}
              onChange={(e) => setPlateauWeeks(clamp(Number(e.target.value), 2, 12, 6))}
              className="w-24 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
              aria-label="分析期間（週）"
            />
            <span className={labelClass}>週間</span>
          </div>
        </div>
        <button
          className="w-fit rounded bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 active:scale-95 transition-all disabled:opacity-40"
          disabled={plateauQuery.isFetching}
          onClick={() => { void plateauQuery.refetch(); }}
        >
          {plateauQuery.isFetching ? "分析中..." : "停滞を診断"}
        </button>
        {plateauQuery.isError && (
          <p className="text-sm text-red-500" role="alert">{plateauQuery.error.message}</p>
        )}
        {plateauQuery.data && (
          <div className="rounded bg-white dark:bg-gray-800 p-3 text-sm dark:text-white flex flex-col gap-2">
            <p className={`font-medium ${plateauQuery.data.isPlateau ? "text-orange-500" : "text-green-500"}`}>
              {plateauQuery.data.isPlateau ? "⚠️ 停滞傾向あり" : "✅ 停滞なし"}
            </p>
            <p>{plateauQuery.data.summary}</p>
            {plateauQuery.data.suggestions && (
              <ul className="list-disc list-inside text-xs text-gray-500 dark:text-gray-400 mt-1">
                {plateauQuery.data.suggestions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* 目標プラン生成 */}
      <section className="flex flex-col gap-3 rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
        <Subheader content="目標プラン生成" variant="section" />
        <div className="flex flex-col gap-1">
          <label className={labelClass}>トレーニング目標</label>
          <input
            className={inputClass}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="例）筋肥大、ダイエット、筋力アップ"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className={labelClass}>期間</label>
            <div className="flex items-center gap-1">
              <input
                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
                type="number"
                value={weeks}
                min={2}
                max={24}
                onChange={(e) => setWeeks(clamp(Number(e.target.value), 2, 24, 8))}
                aria-label="期間（週）"
              />
              <span className={labelClass}>週</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className={labelClass}>週の練習日数</label>
            <div className="flex items-center gap-1">
              <input
                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
                type="number"
                value={daysPerWeek}
                min={2}
                max={7}
                onChange={(e) => setDaysPerWeek(clamp(Number(e.target.value), 2, 7, 4))}
                aria-label="週あたり練習日数"
              />
              <span className={labelClass}>日</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>利用できる器具</label>
          <input
            className={inputClass}
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            placeholder="例）ダンベル、バーベル、マシン（任意）"
          />
        </div>
        <button
          className="w-fit rounded bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 active:scale-95 transition-all disabled:opacity-40"
          disabled={goalProgramMutation.isLoading || goal.length < 3}
          onClick={() => { goalProgramMutation.mutate({ goal, weeks, daysPerWeek, equipment: equipment || undefined }); }}
        >
          {goalProgramMutation.isLoading ? "生成中..." : "プランを生成"}
        </button>
        {goal.length > 0 && goal.length < 3 && (
          <p className="text-xs text-orange-500">目標は3文字以上入力してください</p>
        )}
        {goalProgramMutation.isError && (
          <p className="text-sm text-red-500" role="alert">{goalProgramMutation.error.message}</p>
        )}
        {goalProgramMutation.data && (
          <GoalPlanResult
            goal={goalProgramMutation.data.goal}
            weeks={goalProgramMutation.data.weeks}
            daysPerWeek={goalProgramMutation.data.daysPerWeek}
            plan={goalProgramMutation.data.plan}
          />
        )}
      </section>
    </div>
  );
};
