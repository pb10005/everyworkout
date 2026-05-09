import { type ChangeEvent, useState } from "react";
import { userEvent, within, expect } from "@storybook/test";
import { EditGoalForm } from "./EditGoalForm";

export default {
    component: EditGoalForm,
    title: 'Edit goal form',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        goal: '',
        submit: () => { alert('submit'); },
        cancel: () => { alert('cancel'); },
    },
    render: function Comp(){
      const [value, setValue] = useState('');

      return (
        <EditGoalForm
          submit={() => { alert(`submit: ${value}`); } }
          cancel={() => {setValue('')}}
          goal={value}
          setGoal={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        ></EditGoalForm>
      );
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const textarea = canvas.getByPlaceholderText('目標');
        await userEvent.type(textarea, '毎日30分走る');
        await expect(textarea).toHaveValue('毎日30分走る');
        await userEvent.click(canvas.getByText('送信'));
    },
};

export const WithCancel = {
    render: function Comp(){
        const [value, setValue] = useState('現在の目標テキスト');

        return (
            <EditGoalForm
                submit={() => {setValue('')}}
                cancel={() => {setValue('')}}
                goal={value}
                setGoal={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
            ></EditGoalForm>
        );
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByText('キャンセル'));
    },
};
