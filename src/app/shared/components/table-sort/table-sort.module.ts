import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableSortComponent } from "./table-sort.component";

@NgModule({
  declarations: [TableSortComponent],
  exports: [TableSortComponent],
  imports: [CommonModule],
})
export class TableSortModule {}
