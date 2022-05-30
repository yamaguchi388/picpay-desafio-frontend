import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DpDatePickerModule } from "ng2-date-picker";

import { EditDialogComponent } from "./edit-dialog.component";
import { PaymentFactory } from "../../../factorys/payment.factory";
import { DateHourModule } from "../../atoms/date-hour/date.hour.module";
import { EditValidator } from "../../../services/validators/edit.validator";
import { DateHelper } from "src/app/services/date-helper/date.helper";

@NgModule({
  declarations: [EditDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    DateHourModule,
  ],
  exports: [EditDialogComponent],
  providers: [PaymentFactory, EditValidator, DateHelper],
})
export class EditDialogModule {}
