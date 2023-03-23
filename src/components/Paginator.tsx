import * as React from "react";
import { Button } from ".";

type Props = {
    className?: string;
    page: number;
    perPage: number;
    maxPage: number;
    setPage: (page: number) => void; 
};

export const Paginator: React.FC<Props> = (props: Props) => {
    const { className, page, perPage, maxPage, setPage } = props;

    const viewPrev = () => {
        const currentPage = Math.max(0, page - 1);
        setPage(currentPage);
    };

    const viewNext = () => {
        const currentPage = Math.min(page + 1, maxPage - 1);
        setPage(currentPage);
    };


    return (
        <>
            <div className={`flex justify-center ${className || ""}`}>
                <Button onClick={viewPrev}>Prev</Button>
                <span className="inline-block py-2 mx-4">{page + 1}/{maxPage}</span>
                <Button onClick={viewNext}>Next</Button>
            </div>
        </>
    );
};
