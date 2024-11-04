import Timer from "../components/Timer";

export default {
    title: 'Timer',
    component: Timer,
    argTypes: {
        title: { control: 'text' },
        endTime: { control: 'number' },
    }
};

export const Default = (args) => <Timer {...args} />