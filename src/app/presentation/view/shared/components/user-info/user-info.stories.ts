import { Meta, Story } from "@storybook/angular";
import { UserInfoComponent } from "./user-info.component";

export default {
    title: 'Components/UserInfo',
    component: UserInfoComponent,
} as Meta;

const Template: Story = args => ({
    props: {
        ...args
    }
})

export const Default = Template.bind({});
Default.args = {
    user: {
        name: 'João da Silva',
        nick: 'joao',
    }
}