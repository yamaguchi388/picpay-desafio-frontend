import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DpDatePickerModule } from "ng2-date-picker";
import { DateComponent } from "./date.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [DateComponent],
  imports: [CommonModule, FormsModule, DpDatePickerModule],
  exports: [DateComponent],
})
export class DateModule {}
