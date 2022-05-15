import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MyPaymentsComponent } from './my-payments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyPaymentsRoutingModule } from './my-payments-routing.module';
import { PaymentService } from './services/payment.service';
import { PpGridModule } from './components/grid/pp-grid.module';

@NgModule({
  declarations: [
    MyPaymentsComponent,
  ],
  providers:[
    PaymentService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MyPaymentsRoutingModule,
    PpGridModule
  ]
})
export class MyPaymentsModule { }
