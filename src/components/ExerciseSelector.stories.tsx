import { useState } from "react";
import { ExerciseSelector } from "./ExerciseSelector";
import meta from "./ExerciseSelector.stories";

export default {
    component: ExerciseSelector,
    title: 'Exercise selector',
    tags: ['autodocs'],
};

export const Default = {
    render: function Comp() {
        const [selectedExerciseId, selectExerciseId] = useState<number>(-1);
        const [selectedBodyPartId, selectBodyPartId] = useState<number>(-1);
        const muscles = [
            { id: 1, name: '大胸筋中部', name_kana: '', bodyPartId: 1, description: '', exercises: [{ exercise: { id: 1, name: 'ベンチプレス', description: '' } }] },
            { id: 2, name: '大腿四頭筋', name_kana: '', bodyPartId: 2, description: '', exercises: [{ exercise: { id: 2, name: 'スクワット', description: '' } }] },
        ];
        const bodyParts = [
            { id: 1, name: '胸' },
            { id: 2, name: '脚' },
        ];

        return (
          <meta.component
            selectedBodyPartId={selectedBodyPartId}
            selectedExerciseId={selectedExerciseId}
            muscles={muscles}
            bodyParts={bodyParts}
            handleBodyPartClick={selectBodyPartId}
            handleExerciseClick={selectExerciseId}
          ></meta.component>
        );
    }
};