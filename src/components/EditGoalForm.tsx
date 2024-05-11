import type { ChangeEventHandler, FormEvent } from "react";

import { Button } from "../components";

type Props = {
  goal: string;
  setGoal: ChangeEventHandler<HTMLTextAreaElement>;
  submit: () => void;
  cancel: () => void;
};

export function EditGoalForm(props: Props) {
  const { goal, setGoal, submit, cancel } = props;
  const onSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    submit();
  }
  return (<>
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <textarea
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight
          text-gray-700 shadow focus:outline-none
          dark:bg-gray-700 dark:text-white dark:border-gray-500"
        id="note"
        placeholder="目標"
        value={goal}
        onInput={setGoal}
      />
      <div className="flex gap-2">
        <Button type="button" onClick={cancel}>キャンセル</Button>
        <Button type="submit" onClick={() => void (0)}>送信</Button>
      </div>
    </form>
  </>);
}