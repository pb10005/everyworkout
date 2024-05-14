import React from "react";

type Props = {
    children: React.ReactNode;
};

export function Container(props: Props) {
    const { children } = props;

    return (<>
        <div className="grid md:grid-cols-12">
            <div className="md:col-span-6 md:col-start-4 bg-white rounded-lg p-2 grid gap-2 dark:bg-gray-900 dark:outline outline-1 outline-gray-500">
                {children}
            </div>
        </div>
    </>);
}