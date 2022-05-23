import { Meta, moduleMetadata } from "@storybook/angular";
import { SharedModule } from "../../shared.module";
import { FilterTabComponent } from "./filter-tab.component";

export default {
    title: 'Components/FilterTab',
    component: FilterTabComponent,
    decorators: [
        moduleMetadata({
            imports: [SharedModule],
        })
    ]
} as Meta;

export const Default = () => ({});