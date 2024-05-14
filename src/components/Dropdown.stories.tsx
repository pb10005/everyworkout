import { Dropdown } from "./Dropdown";

export default {
    component: Dropdown,
    title: 'Dropdown',
    tags: ['autodocs'],
}

export const Default = {
    args: {
        children: <>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                <li className="block px-6 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white">
                    削除
                </li>
            </ul>
        </>
    }
};
