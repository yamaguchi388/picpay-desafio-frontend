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

const routes: Routes = [{ path: "", component: PaymentsTableComponent }];

@NgModule({
  declarations: [PaymentsTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([PaymentsEffects]),
    StoreModule.forFeature("payments", paymentsReducer),
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    NzPaginationModule,
  ],
})
export class PaymentsModule {}
