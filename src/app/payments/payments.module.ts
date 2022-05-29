import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { PaymentEditDialogModule } from '../shared/components/payment-dialogs/payment-dialogs.module';
import { PaymentsComponent } from './payments.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsTableComponent } from './payments-table/payments-table.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PaymentsComponent, PaymentsTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    PaymentsRoutingModule,
    TranslateModule.forChild(),
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule,
    PaymentEditDialogModule
  ]
})
export class PaymentsModule {}
