import { Dropdown } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";

export default {
    component: Dropdown,
    title: 'Dropdown',
    tags: ['autodocs'],
}

export const Default = {
    args: {
        children: <>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                <DropdownItem onClick={() => {alert('削除 called')}}>
                    削除
                </DropdownItem>
            </ul>
        </>
    }
};
