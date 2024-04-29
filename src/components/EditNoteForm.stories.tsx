import { ChangeEvent, useState } from "react";
import { EditNoteForm } from "./EditNoteForm";

import meta from "./EditNoteForm.stories";

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
        <meta.component
          submit={() => {setValue('')}}
          cancel={() => {setValue('')}}
          note={value}
          setNote={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        ></meta.component>
      );
    },
};
