"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SparklesIcon } from "@heroicons/react/20/solid";
import { WorkoutMenuEditor } from "../../components";
import type { WorkoutMenuItemProps, WorkoutMenuSubmitProps } from "../../components/types";
import { api } from "../../utils/api";

export const WorkoutMenuAddPage: React.FC = () => {
  const router = useRouter();
  const [workoutMenu, setWorkoutMenu] = useState<WorkoutMenuItemProps[]>([]);
  const [aiError, setAiError] = useState<string>("");

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
    aiMutation.mutate({ excludeRecentDays: 2 });
  };

  const aiEnabled = aiSettings?.aiEnabled ?? false;

  return (
    <div className="flex flex-col gap-3">
      <div className="mx-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleAiGenerate}
            disabled={!aiEnabled || aiMutation.isLoading}
            title={!aiEnabled ? "AI機能は有効化されていません" : "AIがあなたの履歴から最適なメニューを提案します"}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white text-sm font-medium
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:bg-purple-600 active:scale-95 transition-all duration-150"
          >
            <SparklesIcon className="w-4 h-4" />
            {aiMutation.isLoading ? "生成中..." : "AIでメニューを生成"}
          </button>
          {!aiEnabled && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              ※AI機能は未有効化
            </span>
          )}
        </div>
        {aiError && (
          <p className="text-sm text-red-500 dark:text-red-400">{aiError}</p>
        )}
        {aiMutation.isSuccess && workoutMenu.length > 0 && (
          <p className="text-sm text-green-600 dark:text-green-400">
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
