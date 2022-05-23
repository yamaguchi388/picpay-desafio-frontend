import { Meta, Story } from "@storybook/angular";
import { HeaderComponent } from "./header.component";

export default {
    title: 'Components/Header', 
    component: HeaderComponent,
} as Meta;

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
    props: args,
    template: `
        <app-header [variant]="variant">Texto Aleatório</app-header>
    `
});

export const Display_1 = Template.bind({});
Display_1.args = {
    variant: '1'
};

export const Display_2 = Template.bind({});
Display_2.args = {
    variant: '2'
};