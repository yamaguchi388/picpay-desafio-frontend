import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments/payments/payments.component';
import { BlockedRoutingModule } from './blocked-routing.module';



@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    BlockedRoutingModule
  ]
})
export class BlockedModule { }
