"use client";

import { api } from "../../../../utils/api";

import { EditGoalForm } from "../../../../components";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export const EditGoalPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();

    const ids = params?.id || "";
    const goalId = (Array.isArray(ids) ? ids[0] : ids) || "-1";

    const { data: initialValue } = api.goal.getGoalById.useQuery({ id: goalId });
    const util = api.useContext();
    const [goal, setGoal] = useState<string>('');

    const mutation = api.goal.update.useMutation({
        onSuccess() {
            router.push("/dashboard");
        }
    })

    const handleSubmit = async () => {
        await mutation.mutateAsync({
            id: goalId,
            content: goal
        });
    };

    const handleCancel = async () => {
        await util.goal.invalidate();
    };

    useEffect(() => {
        setGoal(initialValue?.content || '');
    }, [initialValue]);
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