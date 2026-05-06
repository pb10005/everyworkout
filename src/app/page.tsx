'use client';

import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthShowcase } from "../components";

const features = [
  {
    title: "記録が1分で完了",
    description: "セット・回数・重量をすばやく入力して、毎日のトレーニングを習慣化。",
  },
  {
    title: "成長を可視化",
    description: "今週の推移グラフと自己ベストで、伸びているポイントがすぐ分かります。",
  },
  {
    title: "目標管理まで一体化",
    description: "目標の作成・更新・振り返りを一つのアプリで完結できます。",
  },
];

const Home: NextPage = () => {
  return (
    <main id="lp" className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-16 pt-12 text-center">
        <Image src="/logo_v.png" alt="EveryWorkout ロゴ" width={420} height={84} priority />
        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          EveryWorkoutは、筋トレ記録・体重管理・目標達成をまとめてサポートする
          トレーニング記録アプリです。
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <AuthShowcase />
          <Link className="text-sm underline underline-offset-4" href="https://everyworkout-docs.netlify.app/" target="_blank">
            ユーザーズガイドを見る
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-4 px-6 pb-20 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-left dark:border-gray-700 dark:bg-gray-800"
          >
            <h2 className="mb-2 text-lg font-bold">{feature.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Home;
