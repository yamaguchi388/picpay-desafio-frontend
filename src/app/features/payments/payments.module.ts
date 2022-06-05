import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { PaymentsTableComponent } from "./components/payments-table/payments-table.component";
import { MatTableModule } from "@angular/material/table";
import { EffectsModule } from "@ngrx/effects";
import { PaymentsEffects } from "./ngrx/payments.effects";
import { StoreModule } from "@ngrx/store";
import { paymentsReducer } from "./ngrx/payments.reducer";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { PaymentsListComponent } from "./pages/payments-list/payments-list.component";
import { PaymentCreateEditComponent } from "./components/payment-create-edit/payment-create-edit.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { PaymentDeleteComponent } from './components/payment-delete/payment-delete.component';

const routes: Routes = [{ path: "", component: PaymentsListComponent }];

@NgModule({
  declarations: [
    PaymentsTableComponent,
    PaymentsListComponent,
    PaymentCreateEditComponent,
    PaymentDeleteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([PaymentsEffects]),
    StoreModule.forFeature("payments", paymentsReducer),
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NzPaginationModule,
    CurrencyMaskModule
  ],
})
export class PaymentsModule {}
