import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaymentsService } from './services/payments.service';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';



@NgModule({
  declarations: [
    PaymentsTableComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: [
    PaymentsTableComponent
  ],
  providers: [
    PaymentsService
  ]
})
export class PaymentsModule { }
