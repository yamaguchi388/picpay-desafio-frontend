import { AddPaymentComponent } from './add-payment/add-payment.component';
import { TitleComponent } from './title/title.component';
import { PaymentComponent } from './payment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  declarations: [PaymentComponent, TitleComponent, AddPaymentComponent]
})
export class PaymentModule { }
