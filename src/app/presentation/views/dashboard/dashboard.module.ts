import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { AddNewPaymentDialogModule } from '../../components/add-new-payment-dialog/add-new-payment-dialog.module';
import { ConfirmationDialogModule } from '../../components/confirmation-dialog/confirmation-dialog.module';
import { EditPaymentDialogModule } from '../../components/edit-payment-dialog/edit-payment-dialog.module';
import { HeaderModule } from '../../components/header/header.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    HeaderModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    AddNewPaymentDialogModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSortModule,
    MatIconModule,
    ConfirmationDialogModule,
    EditPaymentDialogModule,
    MatInputModule,
    ReactiveFormsModule
  ],
})
export class DashboardModule {}
