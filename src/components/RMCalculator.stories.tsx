import { RMCalculator } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RMCalculator> = {
    component: RMCalculator,
    title: 'RM calculator',
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RMCalculator>;

export const Default: Story = {};
