"use client";

import { api } from "../../../utils/api";

import { EditGoalForm, Subheader } from "../../../components";
import { revalidate } from "../../actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const AddGoalPage: React.FC = () => {

    const [goal, setGoal] = useState<string>('');
    const router = useRouter();
    const mutation = api.goal.add.useMutation({
        onSuccess() {
            revalidate('/dashboard');
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
        router.back();
    };
    return (
        <>
            <EditGoalForm goal={goal || ""} setGoal={(e) => setGoal(e.target.value)} submit={() => void handleSubmit()} cancel={() => void handleCancel()} />
            <div>
                <Subheader content="目標設定のヒント" />
                <p className="dark:text-white">一度に設定する目標は一つにしよう！</p>
            </div>
        </>
    )
};