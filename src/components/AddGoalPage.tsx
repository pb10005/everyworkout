"use client";

import { api } from "../utils/api";

import { EditGoalForm } from "../components";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const AddGoalPage: React.FC = () => {
    const [goal, setGoal] = useState<string>('');
    const router = useRouter();
    const mutation = api.goal.add.useMutation({
        onSuccess() {
            router.push('/dashboard');
        }
    });

    const handleSubmit = async () => {
        await mutation.mutateAsync({
            content: goal
        });
    };

    const handleCancel = () => {
        setGoal('');
    };
    return (
        <>
            <EditGoalForm goal={goal || ""} setGoal={(e) => setGoal(e.target.value)} submit={() => void handleSubmit()} cancel={() => void handleCancel()} />
            <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">目標設定のヒント</p>
                <p className="dark:text-white">一度に設定する目標は一つにしよう！</p>
            </div>
        </>
    )
};