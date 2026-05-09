import { fn, userEvent, within, expect } from "@storybook/test";
import { DropdownItem } from "./DropdownItem";

export default {
    component: DropdownItem,
    title: 'DropdownItem',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        children: 'メニュー項目',
        onClick: fn(),
    },
    play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: Record<string, unknown> }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByText('メニュー項目'));
        await expect(args.onClick).toHaveBeenCalled();
    },
};
