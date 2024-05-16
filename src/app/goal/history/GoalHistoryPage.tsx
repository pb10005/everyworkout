"use client";

import React from "react";
import { ListContainer, Subheader } from "../../../components";
import { api } from "../../../utils/api";

export const GoalHistoryPage: React.FC = () => {
    const { data: goals } = api.goal.getUserGoals.useQuery({});

    return (<>
        <Subheader content="過去の目標" />
        <ListContainer>
            {goals && goals.map(g => <>
                <div key={g.id} className="dark:text-white px-4 py-2 flex justify-between">
                    <span>{g.content}</span>
                    <span>{g.updatedAt.toISOString().split('T')[0] || ''}</span>
                </div>
            </>)}
        </ListContainer>
    </>);
};
