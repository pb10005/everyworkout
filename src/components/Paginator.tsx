import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

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
            <div className={`py-2 flex justify-center justify-items gap-2 ${className || ""}`}>
                <ChevronLeftIcon className="w-8 h-8 cursor-pointer" onClick={viewPrev}></ChevronLeftIcon>
                <span className="inline-block flex gap-1 items-center">
                    <span>{page + 1}</span>
                    <span>/</span>
                    <span>{maxPage}</span>
                </span>
                <ChevronRightIcon className="w-8 h-8 cursor-pointer" onClick={viewNext}></ChevronRightIcon>
            </div>
        </>
    );
};
