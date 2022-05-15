import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentsComponent } from "./payments.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { NewPaymentDialogComponent } from "./components/new-payment-dialog/new-payment-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DeletePaymentDialogComponent } from "./components/delete-payment-dialog/delete-payment-dialog.component";
import { InputModule } from "src/app/shared/components/form/input/input.module";

import { TableSortModule } from "../../shared/components/table-sort/table-sort.module";
import { HeaderModule } from "src/app/shared/components/header/header.module";

const routes: Routes = [
  {
    path: "",
    component: PaymentsComponent,
  },
];

@NgModule({
  declarations: [
    PaymentsComponent,
    NewPaymentDialogComponent,
    DeletePaymentDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    InputModule,
    TableSortModule,
  ],
})
export class PaymentsModule {}
