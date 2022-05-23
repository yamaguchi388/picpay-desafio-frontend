import { Meta, moduleMetadata } from "@storybook/angular";
import { SharedModule } from "../../shared.module";
import { PaginatorComponent } from "./paginator.component";

export default {
    title: 'Components/Paginator',
    component: PaginatorComponent,
    decorators: [
        moduleMetadata({
            imports: [ SharedModule ]
        })
    ]
} as Meta;

export const Default = () => ({
    props: {
        page: 1,
        totalCount: 100,
        onChange: (value: any) => console.log(value)
    }
})