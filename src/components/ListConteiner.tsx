import React from "react";

type Props = {
    children: React.ReactNode;
};

export const ListContainer: React.FC<Props> = (props: Props) => {
    const { children } = props;

    return (<>
        <ul className="flex flex-col divide-y shadow dark:shadow-none bg-white dark:divide-gray-500 dark:bg-gray-900 dark:outline outline-1 outline-gray-500">
            {children}
        </ul>
    </>);
};