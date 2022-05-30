import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DpDatePickerModule } from "ng2-date-picker";

import { IncludeDialogComponent } from "./include-dialog.component";
import { PaymentFactory } from "../../../factorys/payment.factory";
import { DateHourModule } from "../../atoms/date-hour/date.hour.module";
import { IncludeValidator } from "../../../services/validators/include.validator";
import { DateHelper } from "src/app/services/date-helper/date.helper";

@NgModule({
  declarations: [IncludeDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    DateHourModule,
  ],
  exports: [IncludeDialogComponent],
  providers: [PaymentFactory, IncludeValidator, DateHelper],
})
export class IncludeDialogModule {}
