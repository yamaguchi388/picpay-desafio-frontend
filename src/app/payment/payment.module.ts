import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { PaymentComponent } from './payment.component';
import { TitleComponent } from './title/title.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { TableComponent } from './table/table.component';
import { DialogComponent } from './dialog/dialog.component';
import { FormComponent } from './form/form.component';
import { FiltersComponent } from './filters/filters.component';
import { DeleteComponent } from './delete/delete.component';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule
  ],
  declarations: [
    PaymentComponent,
    TitleComponent,
    AddPaymentComponent,
    TableComponent,
    FormComponent,
    DialogComponent,
    FiltersComponent,
    DeleteComponent
  ]
})
export class PaymentModule { }
