import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments/payments/payments.component';
import { BlockedRoutingModule } from './blocked-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DeletePaymentsComponent } from './delete-payments/delete-payments/delete-payments.component';
import { NewPaymentsComponent } from './new-payments/new-payments/new-payments.component';



@NgModule({
  declarations: [
    PaymentsComponent,
    DeletePaymentsComponent,
    NewPaymentsComponent
  ],
  imports: [
    CommonModule,
    BlockedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class BlockedModule { }
