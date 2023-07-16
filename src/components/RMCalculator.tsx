import React from "react";
import { useState } from "react";

enum Exercise {
    BenchPress = 1,
    Squat = 2,
}

export const RMCalcualtor: React.FC = () => {
    const [weight, setWeight] = useState<number>(60);
    const [reps, setReps] = useState<number>(10);

    const calculate = (weight: number, reps: number, exercise: Exercise): number => {
        if (exercise === Exercise.BenchPress) {
            return weight * (1 + 0.025 * reps);
        } else if (exercise === Exercise.Squat) {
            return weight * (1 + 0.03 * reps);
        } else return 0;
    };

    const result = calculate(weight, reps, Exercise.BenchPress);
    return (
        <>
            <div className="mb-2">
                <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="weight"
                >
                    重量
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
            <div>{result}</div>
        </>
    );
};
