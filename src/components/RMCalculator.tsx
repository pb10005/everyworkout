"use client";

import React from "react";
import { useState } from "react";

enum Exercise {
    BenchPress = 1,
    Squat = 2,
    DeadLift = 3,
}

export interface RMCalculatorProps {
    className?: string;
}

export const RMCalculator: React.FC<RMCalculatorProps> = ({ className }) => {
    const [exercise, setExercise] = useState<Exercise>(Exercise.BenchPress);
    const [weight, setWeight] = useState<number>(50);
    const [reps, setReps] = useState<number>(10);

    const calculate = (weight: number, reps: number, exercise: Exercise): number => {
        switch (exercise) {
            case Exercise.BenchPress:
                return weight * (1 + 0.025 * reps);
            case Exercise.Squat:
                return weight * (1 + 0.03 * reps);
            case Exercise.DeadLift:
                return weight * (1 + 0.03 * reps);
            default:
                return 0;
        }
    };

    const result = calculate(weight, reps, exercise);
    
    // Form styles
    const formGroupStyle = "mb-4";
    const labelStyle = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";
    const inputStyle = "w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition-colors duration-200 shadow-sm";
    const resultContainerStyle = "mt-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg shadow-inner";
    const resultLabelStyle = "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";
    const resultValueStyle = "text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent";
    const referenceStyle = "mt-4 text-sm text-gray-500 dark:text-gray-400";
    const linkStyle = "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200";

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md dark:border dark:border-gray-700 mx-2 md:mx-0 p-6 ${className || ''}`}>
            <div className={formGroupStyle}>
                <label
                    className={labelStyle}
                    htmlFor="exercise"
                >
                    種目
                </label>
                <select
                    className={inputStyle}
                    id="exercise"
                    value={exercise}
                    onChange={(e) => setExercise(parseInt(e.target.value))}
                >
                    <option value={Exercise.BenchPress}>ベンチプレス</option>
                    <option value={Exercise.Squat}>スクワット</option>
                    <option value={Exercise.DeadLift}>デッドリフト</option>
                </select>
            </div>
            <div className={formGroupStyle}>
                <label
                    className={labelStyle}
                    htmlFor="weight"
                >
                    重量(kg)
                </label>
                <input
                    className={inputStyle}
                    id="weight"
                    type="number"
                    placeholder="重量を入力"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                />
            </div>
            <div className={formGroupStyle}>
                <label
                    className={labelStyle}
                    htmlFor="reps"
                >
                    Reps
                </label>
                <input
                    className={inputStyle}
                    id="reps"
                    type="number"
                    placeholder="回数を入力"
                    min={2}
                    value={reps}
                    onChange={(e) => setReps(parseInt(e.target.value))}
                />
            </div>
            <div className={resultContainerStyle}>
                <p className={resultLabelStyle}>1RM換算重量</p>
                <p className="flex items-baseline">
                    <span className={resultValueStyle}>{result.toFixed(1)}</span>
                    <span className="ml-1 text-gray-700 dark:text-gray-300 font-medium">kg</span>
                </p>
            </div>
            <p className={referenceStyle}>
                参考: <a className={linkStyle} target="_blank" rel="noreferrer" href="https://fwj.jp/magazine/rm/">https://fwj.jp/magazine/rm/</a>
            </p>
        </div>
    );
};
