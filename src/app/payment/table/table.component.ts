import { PaymentService } from './../../service/payment.service';
import { DialogComponent } from './../dialog/dialog.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

interface PaymentObject {
  id?: number; 
  name: string; 
  username: string; 
  title: string; 
  value: number; 
  date: string; 
  image?: string, 
  isPayed: boolean
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  displayedColumns: string[] = ['user', 'title', 'date', 'value', 'isPayed', 'action'];
  check!: boolean; 
  @Input() dataSource!: PaymentObject[];
  @Output() action = new EventEmitter();
  @Output() sort = new EventEmitter();

  constructor(private matDialog: MatDialog,
    private paymentService: PaymentService) { }

  sortChange(value) {
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
      if(result)
        this.action.emit(result);
    });
  }

  updatePayment(payment: PaymentObject): void {
    this.check = true;
    payment.isPayed = !payment.isPayed;
    this.paymentService.putPayment(payment).subscribe((payment: PaymentObject) => {
      this.check = false;
    },
    error => {
      console.error('Error: ', error)
      this.check = false;
    });
  }

}
