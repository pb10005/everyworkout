import { CheckCircleIcon } from "@heroicons/react/20/solid";
import React from "react";
import { ListContainer } from ".";
import type { ExerciseProps } from "./types";

type Props = {
    exercises: ExerciseProps[];
    handleExerciseClick: (id: number, bodyPartId: number) => void;
};

export const WorkoutMenu: React.FC<Props> = (props: Props) => {
    const { exercises, handleExerciseClick } = props;

    return (
        <ListContainer variant="interactive">
            {exercises.map(e => (
                <li 
                    key={e.id} 
                    className="flex justify-between items-center cursor-pointer transition-all duration-200"
                    onClick={() => handleExerciseClick(e.id, e.bodyPartId)}
                >
                    <span className="dark:text-white font-medium">{e.name}</span>
                    <CheckCircleIcon 
                        className={`${e.isSelected ? 'text-green-500 scale-110' : 'text-gray-300'} transition-all duration-200 w-6 h-6`} 
                    />
                </li>
            ))}
        </ListContainer>
    );
};
