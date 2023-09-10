import type { ChangeEventHandler, FormEvent } from "react";
import { useState } from "react";
import { type NextPage } from "next";
import { useRouter, useParams, usePathname } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import { AuthShowcase, Button, Heading, Navigation, Loading, WorkoutCard } from "../components";
import { api } from "../utils/api";

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
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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