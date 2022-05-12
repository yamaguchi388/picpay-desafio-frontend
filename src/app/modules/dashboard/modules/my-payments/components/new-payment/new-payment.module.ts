import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { NewPaymentComponent } from './new-payment.component';

@NgModule({
  declarations: [
    NewPaymentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewPaymentComponent
  ]
})
export class NewPaymentModule { }
