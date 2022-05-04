import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';

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
    TableModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule
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
