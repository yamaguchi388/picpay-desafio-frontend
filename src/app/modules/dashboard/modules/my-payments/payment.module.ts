import { NgModule } from '@angular/core';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ListPaymentsComponent } from './components/list-payment/list-payment.component';

@NgModule({
  declarations: [
    PaymentComponent,
    ListPaymentsComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
  ]
})
export class PaymentModule { }
