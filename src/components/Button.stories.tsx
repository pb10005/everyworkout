import { Button } from "./Button";

export default {
    component: Button,
    title: 'Button',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        children: "PRESS"
    },
};

export const Danger = {
    args: {
        children: "PRESS",
        layout: 'danger'
    },
};

export const Dark = {
    args: {
        children: "PRESS",
        className: 'dark'
    },
};