import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsService } from './services/payments.service';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';



@NgModule({
  declarations: [
    PaymentsTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaymentsTableComponent
  ],
  providers: [
    PaymentsService
  ]
})
export class PaymentsModule { }
