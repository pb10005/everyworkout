import { BackButton } from "./BackButton";

export default {
    component: BackButton,
    title: 'Back button',
    tags: ['autodocs']
}

export const Default = {};

export const WithLabel = {
    args: {
        children: <span>戻る</span>
    }
};