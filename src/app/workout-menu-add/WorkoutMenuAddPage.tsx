"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SparklesIcon } from "@heroicons/react/20/solid";
import { WorkoutMenuEditor } from "../../components";
import type { WorkoutMenuItemProps, WorkoutMenuSubmitProps } from "../../components/types";
import { api } from "../../utils/api";

const EXCLUDE_DAYS_OPTIONS = [
  { value: 0, label: "0日" },
  { value: 2, label: "2日" },
  { value: 4, label: "4日" },
  { value: 7, label: "7日" },
] as const;

export const WorkoutMenuAddPage: React.FC = () => {
  const router = useRouter();
  const [workoutMenu, setWorkoutMenu] = useState<WorkoutMenuItemProps[]>([]);
  const [aiError, setAiError] = useState<string>("");
  const [excludeRecentDays, setExcludeRecentDays] = useState<number>(2);

  const { data: bodyParts } = api.bodyPart.getAll.useQuery();
  const { data: muscles } = api.muscle.getAllExercises.useQuery();
  const { data: exercises } = api.exercise.getAll.useQuery();
  const { data: aiSettings } = api.userSettings.get.useQuery();

  const mutation = api.workoutMenu.add.useMutation({
    onSuccess() {
      router.push("/workout-menu");
    },
  });

  const aiMutation = api.ai.generateWorkoutMenu.useMutation({
    onSuccess(items) {
      setAiError("");
      setWorkoutMenu(items);
    },
    onError(err) {
      setAiError(err.message);
    },
  });

  const handleSetWorkoutMenu = (menu: WorkoutMenuItemProps[]) => {
    setWorkoutMenu(menu);
  };

  const handleSubmit = async (data: WorkoutMenuSubmitProps) => {
    await mutation.mutateAsync({
      title: data.title,
      exercisesJson: JSON.stringify(data.exercises),
    });
  };

  const handleAiGenerate = () => {
    setAiError("");
    aiMutation.mutate({ excludeRecentDays });
  };

  const aiEnabled = aiSettings?.aiEnabled ?? false;
  const isGenerating = aiMutation.isLoading;

  return (
    <div className="flex flex-col gap-3">
      <div className="mx-2 flex flex-col gap-3">
        {aiEnabled && (
          <div className="flex flex-col gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex items-center gap-1.5">
              <SparklesIcon className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-medium text-purple-600 dark:text-purple-300">AI メニュー生成</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500 dark:text-gray-400">直近除外日数：</span>
              {EXCLUDE_DAYS_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  disabled={isGenerating}
                  onClick={() => setExcludeRecentDays(value)}
                  aria-pressed={excludeRecentDays === value}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all duration-150 disabled:opacity-40
                    ${excludeRecentDays === value
                      ? "bg-purple-500 text-white shadow-sm"
                      : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-purple-400"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={handleAiGenerate}
              disabled={isGenerating}
              aria-label="AIがトレーニング履歴を分析して最適なメニューを提案します"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white text-sm font-medium
                disabled:opacity-40 disabled:cursor-not-allowed
                hover:bg-purple-600 active:scale-95 transition-all duration-150"
            >
              <SparklesIcon className={`w-4 h-4 ${isGenerating ? "animate-pulse" : ""}`} />
              {isGenerating ? "生成中..." : "AIでメニューを生成"}
            </button>
          </div>
        )}
        {!aiEnabled && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mx-1">
            ※ AI機能は未有効化です。プロフィールページから有効化を申請できます。
          </p>
        )}
        {aiError && (
          <p className="text-sm text-red-500 dark:text-red-400" role="alert">{aiError}</p>
        )}
        {aiMutation.isSuccess && workoutMenu.length > 0 && (
          <p className="text-sm text-green-600 dark:text-green-400" role="status">
            AIがメニューを提案しました。必要に応じて編集できます。
          </p>
        )}
      </div>

      <WorkoutMenuEditor
        bodyParts={bodyParts || []}
        muscles={muscles || []}
        exercises={exercises || []}
        workoutMenu={workoutMenu}
        setWorkoutMenu={handleSetWorkoutMenu}
        submit={(data: WorkoutMenuSubmitProps) => void handleSubmit(data)}
      />
    </div>
  );
};
