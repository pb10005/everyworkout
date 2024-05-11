import React from "react";
import { api } from "../utils/api";

export const GoalHistoryPage: React.FC = () => {
    const { data: goals } = api.goal.getUserGoals.useQuery({});

    return (<>
        <p className="text-sm text-gray-500 dark:text-gray-200">過去の目標</p>
        <section className="divide-y dark:text-white dark:divide-gray-500 dark:outline outline-1 outline-gray-500">
            {goals && goals.map(g => <>
                <div key={g.id} className="px-4 py-2 flex justify-between">
                    <span>{g.content}</span>
                    <span>{g.updatedAt.toISOString().split('T')[0] || ''}</span>
                </div>
            </>)}
        </section>
    </>);
};
