import { Timer } from "./Timer";

export default {
    component: Timer,
    title: 'Timer',
    tags: ['autodocs'],
}

export const Default = {
    args: {
        expiryTimeDelta: 120,
        onExpire: () => {},
    },
};
