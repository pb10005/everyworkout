"use client";

import { api } from "../../../../utils/api";

import { EditGoalForm, Subheader } from "../../../../components";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export const EditGoalPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();

    const ids = params?.id || "";
    const goalId = (Array.isArray(ids) ? ids[0] : ids) || "-1";

    const { data: initialValue } = api.goal.getGoalById.useQuery({ id: goalId });
    const util = api.useContext();
    const [goal, setGoal] = useState<string>();

    useEffect(() => {
        setGoal(initialValue?.content || '');
    }, [initialValue]);

    const mutation = api.goal.update.useMutation({
        onSuccess() {
            router.push("/dashboard");
        }
    })

    const handleSubmit = async () => {
        await mutation.mutateAsync({
            id: goalId,
            content: goal || ''
        });
    };

    const handleCancel = async () => {
        await util.goal.invalidate();
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