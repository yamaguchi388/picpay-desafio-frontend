import { NgModule } from '@angular/core';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ListPaymentsComponent } from './components/list-payment/list-payment.component';
import { SortModule } from './../../../../shared/components/sort/sort.module';
import { NewPaymentComponent } from './components/new-payment/new-payment.component';
import { DeletePaymentComponent } from './components/delete-payment/delete-payment.component';

@NgModule({
  declarations: [
    PaymentComponent,
    ListPaymentsComponent,
    NewPaymentComponent,
    DeletePaymentComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    SortModule
  ]
})
export class PaymentModule { }
