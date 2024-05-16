import React from "react";

type Props = {
    children: React.ReactNode;
    onClick: () => void;
};

export const DropdownItem: React.FC<Props> = (props: Props) => {
    const { children, onClick } = props;
    return (<>
        <li onClick={onClick} className="block px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white">
            {children}
        </li>
    </>);
};
