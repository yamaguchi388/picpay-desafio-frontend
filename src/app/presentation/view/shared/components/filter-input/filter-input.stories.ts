import { moduleMetadata } from "@storybook/angular";
import { SharedModule } from "../../shared.module";
import { FilterInputComponent } from "./filter-input.component";

export default {
    title: 'Components/FilterInput',
    component: FilterInputComponent,
    decorators: [
        moduleMetadata({
            imports: [SharedModule],
        })
    ]
}

export const Default = () => ({});