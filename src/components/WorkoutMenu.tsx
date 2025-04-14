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

    return (<>
        <ListContainer>
            {exercises.map(e => (<>
                <li key={e.id} className="px-4 py-2 flex justify-between cursor-pointer" onClick={() => handleExerciseClick(e.id, e.bodyPartId)}>
                    <span className="dark:text-white">{e.name}</span>
                    <span><CheckCircleIcon className={`${e.isSelected ? 'text-green-500' : 'text-gray-300'}`} width={25} height={25} /></span>
                </li>
            </>))}
        </ListContainer>
    </>);
};
