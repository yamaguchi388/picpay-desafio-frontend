import { SnackBarService } from './../../service/snack-bar.service';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { PaymentService } from './../../service/payment.service';
import { DialogComponent } from './../dialog/dialog.component';
import { PaymentObject } from './../../models/payment-object';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnDestroy {

  subscription!: Subscription;
  displayedColumns: string[] = ['user', 'title', 'date', 'value', 'isPayed', 'action'];
  check!: boolean;
  @Input() dataSource!: PaymentObject[];
  @Output() action = new EventEmitter<boolean>();
  @Output() sort = new EventEmitter<Sort>();

  constructor(
    private matDialog: MatDialog,
    private paymentService: PaymentService,
    private snackBarService: SnackBarService
  ) { }

  sortChange(value: Sort): void {
    this.sort.emit(value);
  }

  dialog(edit: boolean, payment: PaymentObject): void {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        edit,
        delete: !edit,
        payment
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.action.emit(result);
      }
    });
  }

  updatePayment(payment: PaymentObject): void {
    this.check = true;
    payment.isPayed = !payment.isPayed;
    this.subscription = this.paymentService.putPayment(payment)
      .subscribe(() => {
        this.check = false;
        this.snackBarService.success('Atualizado');
      },
      (error: Error) => {
        this.check = false;
        this.errorGeneric(error);
      });
  }

  errorGeneric(error: Error): void {
    console.error('Error: ', error);
    if (error.message === '404') {
      this.snackBarService.error('Dados inválidos! Por favor digite novamente.');
    } else {
      this.snackBarService.error();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
