import type { ChangeEventHandler, FormEvent } from "react";

import { Button } from "../components";

type Props = {
  note: string;
  setNote: ChangeEventHandler<HTMLInputElement>;
  submit: () => void;
  cancel: () => void;
};

export function EditNoteForm(props: Props) {
  const { note, setNote, submit, cancel } = props;
  const onSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    submit();
  }
  return (<>
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <input
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
          text-gray-700 shadow focus:outline-none
          dark:bg-gray-700 dark:text-white dark:border-gray-500"
        type="text"
        id="note"
        placeholder="メモ"
        value={note}
        onChange={setNote}
      />
      <div className="flex gap-2">
        <Button type="button" onClick={cancel}>キャンセル</Button>
        <Button type="submit" onClick={() => void (0)}>送信</Button>
      </div>
    </form>
  </>);
}