import { Meta } from "@storybook/angular";
import { LogoComponent } from "./logo.component";

export default {
    title: 'Components/Logo',
    component: LogoComponent,
} as Meta;

export const Default = () => ({});

export const Light = () => ({
    props: {
        variant: 'light'
    }
});