"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Dropdown, DropdownItem, ListContainer, Subheader } from "../../../components";
import { api } from "../../../utils/api";

export const GoalHistoryPage: React.FC = () => {
    const { data: goals } = api.goal.getUserGoals.useQuery({});
    const router = useRouter();

    return (<>
        <Subheader content="過去の目標" variant="section"/>
        <ListContainer>
            {goals && goals.map(g => <>
                <div key={g.id} className="dark:text-white p-2 flex justify-between items-center">
                    <div className="whitespace-pre-wrap">{g.content}</div>
                    <div className="flex gap-1 items-center">
                        <span>{g.updatedAt.toISOString().split('T')[0] || ''}</span>
                        <Dropdown>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                <DropdownItem onClick={() => router.push(`/goal/edit/${g.id}`)}>
                                    編集
                                </DropdownItem>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
            </>)}
        </ListContainer>
    </>);
};
