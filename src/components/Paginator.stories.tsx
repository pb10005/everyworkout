import { useState } from "react";
import { Paginator } from "./Paginator";

import meta from './Paginator.stories';

export default {
    component: Paginator,
    title: 'Paginator',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        perPage: 5,
        maxPage: 10,
    },
    render: function Comp({ ...args }){ 
        const [page, setPage] = useState<number>(0);  
    
        return (
          <meta.component
            page={page}
            perPage={args.perPage}
            maxPage={args.maxPage}
            setPage={(p: number) => setPage(p)}
          ></meta.component>
        );
      },
};
