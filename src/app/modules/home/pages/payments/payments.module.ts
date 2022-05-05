import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentsComponent } from "./payments.component";
import { RouterModule, Routes } from "@angular/router";
import { HeaderModule } from "../../shared/components/header/header.module";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { NewPaymentDialogComponent } from "./components/new-payment-dialog/new-payment-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: PaymentsComponent,
  },
];

@NgModule({
  declarations: [PaymentsComponent, NewPaymentDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class PaymentsModule {}
