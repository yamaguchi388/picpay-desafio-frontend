import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { DatePipe } from '../../pipes/date/date.pipe';
import { CurrencyBrlPipe } from '../../pipes/currency-brl/currency-brl.pipe';


@NgModule({
  declarations: [
    PaymentComponent,
    DatePipe,
    CurrencyBrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaymentComponent,
    CurrencyBrlPipe
  ]
})
export class PaymentModule { }
