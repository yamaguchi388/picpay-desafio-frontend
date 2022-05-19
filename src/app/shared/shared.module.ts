import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TableModule } from "./components/table/table.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ],
    exports: [TableModule],
    providers: []
  })
  export class SharedModule { }