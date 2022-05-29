import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { PaymentDeleteDialogComponent } from './payment-delete-dialog/payment-delete-dialog.component';
import { PaymentEditDialogComponent } from './payment-edit-dialog/payment-edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatListModule
  ],
  declarations: [PaymentEditDialogComponent, PaymentDeleteDialogComponent],
  exports: [PaymentEditDialogComponent, PaymentDeleteDialogComponent],
  providers: [DatePipe]
})
export class PaymentEditDialogModule {}
