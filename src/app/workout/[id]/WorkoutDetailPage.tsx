"use client";
import React, { useCallback, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { AuthShowcase, Button, Loading, Subheader, WorkoutCard } from "../../../components";
import { api } from "../../../utils/api";
import { revalidate } from "../../actions";
import { ChartBarIcon, ListBulletIcon, ShareIcon, TrophyIcon } from "@heroicons/react/20/solid";

type ShareButtonProps = {
    url: string;
    text: string;
    title: string;
};

const ShareButton: React.FC<ShareButtonProps> = (props: ShareButtonProps) => {
    const { url, text, title } = props;
    const handleClick = useCallback(() => {
        void (async () => {
            if (navigator.share) {
                // Web share API
                await navigator.share({
                    url,
                    text,
                    title,
                });
            } else {
                // Web Share APIが使えないブラウザの処理
                await navigator.clipboard.writeText(url);
                alert("URLをコピーしました");
            }
        })();
    }, [url, text, title]);

    return (
        <button 
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700" 
            onClick={handleClick}
        >
            <ShareIcon className="w-5 h-5 text-blue-500" />
            <span>共有</span>
        </button>
    );
};

export const WorkoutDetailPage: React.FC = () => {
    const params = useParams();
    const pathname = usePathname();
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

    const ids = params?.id || "";
    const id = Array.isArray(ids) ? ids[0] : ids;

    const {
        data,
        isLoading: loadingGet,
        isSuccess: successGet,
    } = api.workout.getWorkoutById.useQuery({
        id: id || "",
    });

    const [metricsCode, setMetricsCode] = useState<string>("01");
    const mutation = api.maximum.add.useMutation();
    const deleteMutation = api.workout.delete.useMutation({
        async onSuccess() {
            await revalidate('/dashboard');
        }
    });

    const registerMaximum = async () => {
        await mutation
            .mutateAsync({
                exerciseId: data?.exerciseId || -1,
                date: data?.date.toISOString() || "",
                metrics_code: metricsCode,
                value:
                    metricsCode === "01"
                        ? data?.weight || 0
                        : metricsCode === "02"
                            ? data?.reps || 0
                            : 0,
            })
            .catch(() => {
                return;
            });
    };
    
    const deleteWorkout = async () => {
        await deleteMutation.mutateAsync({
            id: id || ""
        });
    };

    return (
        <div>
            <div>{!(loadingGet || successGet) && <AuthShowcase />}</div>
            
            {loadingGet && <div className="flex justify-center py-8"><Loading /></div>}
            
            {mutation.isLoading && <div className="flex justify-center py-4"><Loading /></div>}
            
            {mutation.isSuccess && (
                <div className="mb-4 rounded-lg bg-green-100 dark:bg-green-900/30 p-4 text-green-800 dark:text-green-300 flex items-center gap-2 shadow-sm border border-green-200 dark:border-green-800/50 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>最大記録を登録しました</span>
                </div>
            )}
            
            {deleteMutation.isSuccess && (
                <div className="mb-4 rounded-lg bg-green-100 dark:bg-green-900/30 p-4 text-green-800 dark:text-green-300 flex items-center gap-2 shadow-sm border border-green-200 dark:border-green-800/50 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>トレーニング記録を削除しました</span>
                </div>
            )}
            
            {mutation.isError && (
                <div className="mb-4 rounded-lg bg-red-100 dark:bg-red-900/30 p-4 text-red-800 dark:text-red-300 flex items-center gap-2 shadow-sm border border-red-200 dark:border-red-800/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>エラーが発生しました: {mutation.error.data?.path}</span>
                </div>
            )}
            
            {successGet && data && (
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            トレーニング詳細
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {data.exercise.name}のトレーニング記録
                        </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:border dark:border-gray-700 overflow-hidden">
                        <WorkoutCard
                            id={data.id}
                            exerciseName={data.exercise.name}
                            date={data.date}
                            weight={data.weight}
                            reps={data.reps}
                            sets={data.sets}
                            note={data.note}
                            muscles={data.exercise.muscles.map(m => m.muscle)}
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <ShareButton
                            url={`${origin || ''}${pathname || ''}`}
                            text="#everyworkout"
                            title="EVERYWORKOUT"
                        />
                        <Link 
                            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700" 
                            href={`/exercise/${data.exerciseId}`}
                        >
                            <ChartBarIcon className="w-5 h-5 text-blue-500" />
                            <span>グラフを表示</span>
                        </Link>
                        <Link 
                            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700" 
                            href={`/search/${data.exerciseId}`}
                        >
                            <ListBulletIcon className="w-5 h-5 text-blue-500" />
                            <span>履歴を表示</span>
                        </Link>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:border dark:border-gray-700 p-5">
                        <Subheader content="最大記録の登録" variant="section" />
                        
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="metrics">
                                    記録する指標
                                </label>
                                <select
                                    id="metrics"
                                    name="metrics"
                                    className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition-colors duration-200"
                                    value={metricsCode}
                                    onChange={(e) => setMetricsCode(e.target.value)}
                                >
                                    <option value="01">重量 (kg)</option>
                                    <option value="02">回数 (reps)</option>
                                </select>
                            </div>
                            
                            <div className="flex flex-col gap-3">
                                {mutation.isLoading ? (
                                    <Loading />
                                ) : (
                                    <Button 
                                        onClick={() => void registerMaximum()} 
                                        className="w-full"
                                        size="lg"
                                    >
                                        <TrophyIcon className="w-5 h-5 mr-2" />
                                        最大記録として登録
                                    </Button>
                                )}
                                
                                {deleteMutation.isLoading ? (
                                    <Loading />
                                ) : (
                                    <Button 
                                        onClick={() => void deleteWorkout()} 
                                        variant="danger" 
                                        className="w-full"
                                    >
                                        この記録を削除
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
