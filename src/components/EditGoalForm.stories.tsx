import { ChangeEvent, useState } from "react";
import { EditGoalForm } from "./EditGoalForm";

import meta from "./EditGoalForm.stories";

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
        <meta.component
          submit={() => { alert(`submit: ${value}`); } }
          cancel={() => {setValue('')}}
          goal={value}
          setGoal={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        ></meta.component>
      );
    },
};
