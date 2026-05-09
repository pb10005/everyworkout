import { useState } from "react";
import { Paginator } from "./Paginator";

export default {
    component: Paginator,
    title: 'Paginator',
    tags: ['autodocs'],
};

export const Default = {
    render: function Comp(){ 
        const [page, setPage] = useState<number>(0);  
    
        return (
          <Paginator
            page={page}
            maxPage={10}
            setPage={(p: number) => setPage(p)}
          ></Paginator>
        );
      },
};
