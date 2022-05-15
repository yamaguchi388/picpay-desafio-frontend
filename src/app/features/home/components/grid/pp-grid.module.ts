import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PpSortComponent } from "./components/pp-sort.component";
import { PpGridComponent } from "./pp-grid.component";
import { PpIconChevronComponent } from "@/app/shared/components/icons/chevron/pp-icon-chevron.component";
import { PpIconPenComponent } from "@/app/shared/components/icons/pen/pp-icon-pen.component";
import { PpIconTimesCircleComponent } from "@/app/shared/components/icons/times-circle/pp-icon-times-circle.component";
import { PpButtonModule } from "@/app/shared/components/button/pp-button.module";
import { PpIconFilterComponent } from "@/app/shared/components/icons/filter/pp-icon-filter.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    PpSortComponent,
    PpGridComponent,
    PpIconChevronComponent,
    PpIconPenComponent,
    PpIconTimesCircleComponent,
    PpIconFilterComponent
  ],
  imports: [CommonModule, PpButtonModule, FormsModule],
  exports: [PpGridComponent],
})
export class PpGridModule {}
