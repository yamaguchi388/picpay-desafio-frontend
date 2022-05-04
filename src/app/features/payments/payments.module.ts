import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaymentsService } from './services/payments.service';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';
import { MyPaymentsViewComponent } from './views/my-payments-view/my-payments-view.component';



@NgModule({
  declarations: [
    PaymentsTableComponent,
    MyPaymentsViewComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: [
    PaymentsTableComponent,
    MyPaymentsViewComponent
  ],
  providers: [
    PaymentsService
  ]
})
export class PaymentsModule { }
