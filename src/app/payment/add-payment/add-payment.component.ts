import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent {
  title: string = 'Adicionar pagamento';
  @Output() action = new EventEmitter<boolean>();

  constructor(private matDialog: MatDialog) { }

  dialog(add: boolean): void {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        add,
        edit: !add,
        delete: !add,
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.action.emit(result);
    });
  }

}
