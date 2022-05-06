import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { PaymentsService } from './services/payments.service';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';
import { MyPaymentsViewComponent } from './views/my-payments-view/my-payments-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChipModule } from 'primeng/chip';
import { ReactiveFormsModule } from '@angular/forms';




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
    CalendarModule,
    CheckboxModule,
    DialogModule,
    SharedModule,
    ChipModule,
    ConfirmPopupModule,
    ReactiveFormsModule
  ],
  exports: [
    PaymentsTableComponent,
    MyPaymentsViewComponent
  ],
  providers: [
    PaymentsService,
    ConfirmationService,
    MessageService,
    DatePipe,
    CurrencyPipe
  ]
})
export class PaymentsModule { }
