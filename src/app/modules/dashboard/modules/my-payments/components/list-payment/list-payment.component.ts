import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IPayment } from 'src/app/shared/interfaces/payment';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import * as moment from 'moment';
import { QueryPayments } from 'src/app/shared/models/query-payments';
import { MatDialog } from '@angular/material/dialog';
import { NewPaymentComponent } from '../new-payment/new-payment.component';

@Component({
  selector: 'list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss'],
})
export class ListPaymentsComponent implements OnInit {

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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.filterPayments();
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

  filterPayments() {
    const query = {
      name: this.form.controls.name.value || '',
      title: this.form.controls.title.value || '',
      startDate: this.form.controls.startDate.value || "",
      endDate: moment(this.form.controls.endDate.value).add(1, 'day').toString(),
      page: this.paymentPageEvent,
      limit: this.paymentPageSize
    } as QueryPayments;

    this.paymentService.getPayments(query)
      .subscribe((next) => {
          this.payments = next;
          if (this.payments.length === 0) {
            this.sweetAlertService.show({
              icon: 'success',
              text: `Nenhum pagamento foi encontrado.`
            });      
          }
        },
        (err) => {
          console.log(err);
          this.sweetAlertService.show({
            icon: 'error',
            text: `Tente novamente mais tarde.`
          });           
        }
      )
  }

  addPayment() {
    const dialogPass = this.dialog.open(NewPaymentComponent, {
      data: {
        title: 'Adicionar pagamento',
      },
    });
    dialogPass.afterClosed().subscribe();
  }

  changePaymentPage($event) {
    this.loading = true;
    this.paymentPageEvent = $event?.pageIndex + 1;
    this.paymentPageSize = $event?.pageSize;
    this.filterPayments();
  }

}
