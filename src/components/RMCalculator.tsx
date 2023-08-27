"use client";

import React from "react";
import { useState } from "react";

enum Exercise {
    BenchPress = 1,
    Squat = 2,
    DeadLift = 3,
}

export const RMCalcualtor: React.FC = () => {
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
    return (
        <>
            <div className="bg-white rounded-xl shadow-xl p-2">
                <div className="mb-2">
                    <label
                        className="mb-2 block text-sm font-bold text-gray-700"
                        htmlFor="exercise"
                    >
                        種目
                    </label>
                    <select
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="exercise"
                        placeholder="種目"
                        value={exercise}
                        onChange={(e) => setExercise(parseInt(e.target.value))}
                    >
                        <option value={Exercise.BenchPress}>ベンチプレス</option>
                        <option value={Exercise.Squat}>スクワット</option>
                        <option value={Exercise.DeadLift}>デッドリフト</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label
                        className="mb-2 block text-sm font-bold text-gray-700"
                        htmlFor="weight"
                    >
                        重量(kg)
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="weight"
                        type="number"
                        placeholder="重量"
                        value={weight}
                        onChange={(e) => setWeight(parseFloat(e.target.value))}
                    />
                </div>
                <div className="mb-2">
                    <label
                        className="mb-2 block text-sm font-bold text-gray-700"
                        htmlFor="reps"
                    >
                        Reps
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="reps"
                        type="number"
                        placeholder="Reps"
                        min={2}
                        value={reps}
                        onChange={(e) => setReps(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <p className="text-sm text-gray-500">1RM換算重量</p>
                    <p><span className="text-2xl font-extrabold mr-1">{result}</span>kg</p>
                </div>
                <p>参考: <a target="_blank" rel="noreferrer" href="https://fwj.jp/magazine/rm/">https://fwj.jp/magazine/rm/</a></p>
            </div>
        </>
    );
};
