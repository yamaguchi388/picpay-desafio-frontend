import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';

import { EditPaymentDialogComponent } from './edit-payment-dialog.component';

const declarations = [EditPaymentDialogComponent];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, NgxMaskModule, MatCheckboxModule],
})
export class EditPaymentDialogModule {}
