import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export function Container(props: Props) {
    const { children, className = "" } = props;

    return (
        <div className="grid md:grid-cols-12 w-full">
            <div 
                className={`flex flex-col md:col-span-6 md:col-start-4 bg-white rounded-xl 
                md:px-4 px-3 py-3 md:py-5 gap-3 
                dark:bg-gray-900 dark:border dark:border-gray-700
                shadow-sm dark:shadow-none
                transition-all duration-200 ease-in-out ${className}`}
            >
                {children}
            </div>
        </div>
    );
}
