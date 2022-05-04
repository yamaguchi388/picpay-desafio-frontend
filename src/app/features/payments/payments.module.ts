import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

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
    InputTextModule,
    ConfirmDialogModule,
    RippleModule,
    ToastModule,
  ],
  exports: [
    PaymentsTableComponent,
    MyPaymentsViewComponent
  ],
  providers: [
    PaymentsService,
    ConfirmationService,
    MessageService
  ]
})
export class PaymentsModule { }
