"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../utils/api";
import { Button, Subheader } from "../../components";

export const BodyWeightAddPage: React.FC = () => {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0] ?? "";
  const [weight, setWeight] = useState<string>("");
  const [date, setDate] = useState<string>(today);
  const [note, setNote] = useState<string>("");
  const [error, setError] = useState<string>("");

  const mutation = api.bodyWeight.add.useMutation({
    onSuccess: () => {
      router.push("/body-weight");
    },
  });

  const handleSubmit = () => {
    const parsed = parseFloat(weight);
    if (isNaN(parsed) || parsed <= 0) {
      setError("体重は正の数値を入力してください");
      return;
    }
    if (!date) {
      setError("日付を入力してください");
      return;
    }
    setError("");
    mutation.mutate({
      weight: parsed,
      date: new Date(date).toISOString(),
      note: note || undefined,
    });
  };

  return (
    <section className="flex flex-col gap-4">
      <Subheader content="体重を記録する" variant="section" />

      <div className="flex flex-col gap-3 px-2">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1" htmlFor="weight">
            体重 (kg)
          </label>
          <input
            id="weight"
            type="number"
            step="0.1"
            min="0"
            max="999"
            placeholder="例: 70.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded border py-2 px-3 text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1" htmlFor="date">
            日付
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded border py-2 px-3 text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1" htmlFor="note">
            メモ（任意）
          </label>
          <input
            id="note"
            type="text"
            maxLength={200}
            placeholder="例: 朝食前"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded border py-2 px-3 text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-2">
          <Button onClick={handleSubmit} disabled={mutation.isLoading}>
            {mutation.isLoading ? "保存中..." : "保存"}
          </Button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm rounded border dark:border-gray-500 dark:text-gray-300"
          >
            キャンセル
          </button>
        </div>
      </div>
    </section>
  );
};
