import { fn, userEvent, within, expect } from "@storybook/test";
import { Button } from "./Button";

export default {
    component: Button,
    title: 'Button',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        children: "PRESS",
        onClick: fn(),
    },
    play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: Record<string, unknown> }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button'));
        await expect(args.onClick).toHaveBeenCalled();
    },
};

export const Danger = {
    args: {
        children: "PRESS",
        variant: 'danger',
        onClick: fn(),
    },
};

export const Secondary = {
    args: {
        children: "PRESS",
        variant: 'secondary',
        onClick: fn(),
    },
};

export const Disabled = {
    args: {
        children: "PRESS",
        disabled: true,
        onClick: fn(),
    },
};
