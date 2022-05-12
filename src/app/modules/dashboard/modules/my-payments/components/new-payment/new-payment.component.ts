import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IPayment } from 'src/app/shared/interfaces/payment';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss'],
})
export class NewPaymentComponent implements OnInit {

  public form: FormGroup;
  payments: IPayment[];
  pago: boolean = false;
  paymentLength: number = 100;
  paymentPageSize: number = 10;
  paymentPageSizeOptions: number[] = [5, 10, 25, 100];
  paymentPageEvent: number = 0;
  loading: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private sweetAlertService: SweetAlertService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NewPaymentComponent>,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    let today = new Date()
    today.setHours(0,0,0,0);
    this.form = this.formBuilder.group({
      name: new FormControl('', []),
      title: new FormControl('', []),
      startDate: new FormControl(today, []),
      endDate: new FormControl(today, []),
    })
  }

  cleanSearch() {
    this.form.reset()
  }

  onOrderBy(orderBy: string){
    console.log('Ordenar', orderBy)
  }

  addPayment() {
    
  }

  close(): void {
    this.dialogRef.close();
  }

}
