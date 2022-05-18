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
    private paymentService: PaymentService
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
      if (result)
        this.action.emit(result);
    });
  }

  updatePayment(payment: PaymentObject): void {
    this.check = true;
    payment.isPayed = !payment.isPayed;
    this.subscription = this.paymentService.putPayment(payment)
      .subscribe((payment: PaymentObject) => {
        this.check = false;
      },
        error => {
          console.error('Error: ', error)
          this.check = false;
        });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
