import { TableComponent } from './table/table.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { TitleComponent } from './title/title.component';
import { PaymentComponent } from './payment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule
  ],
  declarations: [PaymentComponent, TitleComponent, AddPaymentComponent, TableComponent]
})
export class PaymentModule { }
