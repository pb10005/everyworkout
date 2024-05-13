import { useState } from "react";
import { Paginator } from "./Paginator";

import meta from './Paginator.stories';

export default {
    component: Paginator,
    title: 'Paginator',
    tags: ['autodocs'],
};

export const Default = {
    render: function Comp(){ 
        const [page, setPage] = useState<number>(0);  
    
        return (
          <meta.component
            page={page}
            maxPage={10}
            setPage={(p: number) => setPage(p)}
          ></meta.component>
        );
      },
};
