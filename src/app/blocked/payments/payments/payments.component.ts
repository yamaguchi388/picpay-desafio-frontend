import { DateService } from './../../../shared/services/date/date.service';
import { DeletePaymentsComponent } from './../../delete-payments/delete-payments/delete-payments.component';
import { NewPaymentsComponent } from './../../new-payments/new-payments/new-payments.component';
import { PaymentModel } from './../../../shared/models/payment.model';
import { DialogService } from './../../../shared/services/dialog/dialog.service';
import { take, tap } from 'rxjs/operators';
import { PaymentsService } from './../../../shared/services/payments/payments.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  public currentPage = 1;
  public lastPage: number;
  public limitItens = '5';
  public totalItens: number;
  public payments: Array<PaymentModel>;
  public hide = true;
  public user: string;
  public openDialogNewPayment = false;
  public openDialogDeletePayment = false;
  public date: string;
  public time: string;

  constructor(
    private paymentService: PaymentsService,
    private dateService: DateService,
    private diologService: DialogService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.getPayments();
  }
  
  public formatDate(date: string){
    return this.dateService.formatDate(date);
  }

  public getPayments(currentPage?: number): void {
    if(currentPage) {
      this.currentPage = currentPage
    }

    if(this.user) {
      this.paymentService.getPayments(this.currentPage, this.limitItens, this.user)
      .pipe(
        take(1),
      )
      .subscribe(
        response => this.onSuccess(response),
        error => this.diologService.getErrors(error),
      )
    } else {
      this.paymentService.getPayments(this.currentPage, this.limitItens)
      .pipe(
        take(1),
      )
      .subscribe(
        response => this.onSuccess(response),
        error => this.diologService.getErrors(error),
      )
    }
  }

  public onSuccess(response: HttpResponse<PaymentModel[]>): void {
    this.payments = response.body;
    this.totalItens = Number(response.headers.get('X-Total-Count'));
    this.lastPage = Math.round(this.totalItens/Number(this.limitItens));
  }

  public previousPage(){
    this.currentPage--;
    this.getPayments();
  }

  public nextPage(){
    this.currentPage++;
    this.getPayments();
  }

  public openNewPayment(): void {
    const dialogRef = this.dialog.open(NewPaymentsComponent);
    this.afterCloseDiolog(dialogRef); 
  }

  public openEditPayment(payment: PaymentModel): void {
    const dialogRef = this.dialog.open(NewPaymentsComponent, {data: payment});
    this.afterCloseDiolog(dialogRef);
  }

  public openDeletePayment(payment: PaymentModel): void {
    const dialogRef = this.dialog.open(DeletePaymentsComponent, {data: payment});
    this.afterCloseDiolog(dialogRef);
  }

  public afterCloseDiolog(dialogRef: MatDialogRef<any, any>): void {
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getPayments();
      }
    })
  }

}
