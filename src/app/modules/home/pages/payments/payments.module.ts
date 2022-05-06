import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentsComponent } from "./payments.component";
import { RouterModule, Routes } from "@angular/router";
import { HeaderModule } from "../../shared/components/header/header.module";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { NewPaymentDialogComponent } from "./components/new-payment-dialog/new-payment-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaymentsListTableComponent } from "./components/payments-list-table/payments-list-table.component";
import { DeletePaymentDialogComponent } from './components/delete-payment-dialog/delete-payment-dialog.component';

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
    PaymentsListTableComponent,
    DeletePaymentDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PaymentsModule {}
