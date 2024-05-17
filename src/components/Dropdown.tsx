import { useEffect, useRef, useState } from "react";

type Props = {
    children: React.ReactNode;
};

export const Dropdown: React.FC<Props> = (props: Props) => {
    const { children } = props;

    const [isDropdownVisible, setDrowpdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const documentClickHandler = useRef((_: MouseEvent | TouchEvent) => { return });
    const handleDropdownIconClicked = () => {
        if (isDropdownVisible) {
            document.removeEventListener('click', documentClickHandler.current)
            setDrowpdownVisible(false);
        } else {
            document.addEventListener('click', documentClickHandler.current)
            setDrowpdownVisible(true);
        }
    }

    useEffect(() => {
        documentClickHandler.current = (e: MouseEvent | TouchEvent) => {
            if (dropdownRef?.current?.contains(e.target as Node)) return

            setDrowpdownVisible(false);
            document.removeEventListener('click', documentClickHandler.current)
        }
    }, [dropdownRef]);

    return (<>
    <div>
        <section className="relative">
            <button onClick={() => void handleDropdownIconClicked()} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
            </button>
            <div ref={dropdownRef} id="dropdownDots" className={`z-10 absolute right-0 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-500 cursor-pointer ${isDropdownVisible ? '' : 'hidden'}`}>
                {children}
            </div>
        </section></div>
    </>);

};