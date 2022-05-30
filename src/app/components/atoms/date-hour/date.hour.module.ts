import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DpDatePickerModule } from "ng2-date-picker";
import { DateHourComponent } from "./date.hour.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [DateHourComponent],
  imports: [CommonModule, FormsModule, DpDatePickerModule],
  exports: [DateHourComponent],
})
export class DateHourModule {}
