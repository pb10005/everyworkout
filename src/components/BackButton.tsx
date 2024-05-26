import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
    children?: React.ReactNode
};

export const BackButton: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const router = useRouter();

    return (<>
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => router.back()}>
            <ChevronLeftIcon className="w-8 h-8 dark:text-white"></ChevronLeftIcon>
            <div className="dark:text-white">{children}</div>
        </div>
    </>);
};
