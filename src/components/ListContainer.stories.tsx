import { ListContainer, NoDataCard } from ".";
import type { ListContainerProps } from "./ListContainer";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ListContainer> = {
    component: ListContainer,
    title: "List container",
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof ListContainer>;

export const Default: Story = {
    args: {
        children: <>
            <li>a</li>
            <li>b</li>
            <li>c</li>
        </>
    }
};

export const NoData: Story = {
    args: {
        children: <>
            <NoDataCard />
        </>
    }
};
