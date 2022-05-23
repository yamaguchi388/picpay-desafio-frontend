import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddPaymentModalComponent } from './add-payment-modal/add-payment-modal.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeletePaymentComponent } from './confirm-delete-payment/confirm-delete-payment.component';
import { PaymentListItemComponent } from './payment-list-item/payment-list-item.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    AddPaymentModalComponent,
    PaymentListComponent,
    ConfirmDeletePaymentComponent,
    PaymentListItemComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class HomeModule { }
