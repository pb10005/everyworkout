import { type ChangeEvent, useState } from "react";
import { userEvent, within, expect } from "@storybook/test";
import { EditNoteForm } from "./EditNoteForm";

export default {
    component: EditNoteForm,
    title: 'Edit note form',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        note: '',
        submit: () => { alert('submit'); },
        cancel: () => { alert('cancel'); },
    },
    render: function Comp(){
      const [value, setValue] = useState('');

      return (
        <EditNoteForm
          submit={() => {setValue('')}}
          cancel={() => {setValue('')}}
          note={value}
          setNote={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        ></EditNoteForm>
      );
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText('メモ');
        await userEvent.type(input, 'テストメモ');
        await expect(input).toHaveValue('テストメモ');
        await userEvent.click(canvas.getByText('送信'));
    },
};

export const WithCancel = {
    render: function Comp(){
        const [value, setValue] = useState('初期メモ');

        return (
            <EditNoteForm
                submit={() => {setValue('')}}
                cancel={() => {setValue('')}}
                note={value}
                setNote={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            ></EditNoteForm>
        );
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByText('キャンセル'));
    },
};
