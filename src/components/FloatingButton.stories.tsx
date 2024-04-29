import { FloatingButton } from "./FloatingButton";
import { PlusIcon } from "@heroicons/react/20/solid";

export default {
    component: FloatingButton,
    title: 'Floating Button',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        children: <PlusIcon />,
        href: '',
    },
};
