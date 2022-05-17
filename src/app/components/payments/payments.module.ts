import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { HeaderModule } from './../../shared/header/header.module';
import { AddInsertPaymentsComponent } from './add-insert-payments/add-insert-payments.component';
import { DeletePaymentsComponent } from './delete-payments/delete-payments.component';
import { FetchPaymentsComponent } from './fetch-payments.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    FetchPaymentsComponent,
    AddInsertPaymentsComponent,
    DeletePaymentsComponent,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [FetchPaymentsComponent],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    MatDatepickerModule,
  ],
})
export class FetchPaymentsModule {}
