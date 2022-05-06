import { Component, OnInit } from '@angular/core';
import { Payment } from '../../models/payment';

import { PaymentsService } from '../../services/payments.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss'],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class PaymentsTableComponent implements OnInit {

  payments: Payment[];
  totalPaymentRecords: number;
  currentTablePage: number;
  tableRowsPerPage: number;
  nameFilter: string = '';

  paymentForm: FormGroup;
  showPaymentRegisterDialog: boolean = false;
  paymentRegisterDialogPurpose: string = '';
  paymentFormSubmitted: boolean = false;

  constructor(private formBuilder:FormBuilder, 
              private paymentsService: PaymentsService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private datePipe: DatePipe,
              private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.currentTablePage = 0;
    this.tableRowsPerPage = 5;

    this.fetchPayments();
  }

  handleTablePagination(event): void {
    this.currentTablePage = event.page;
    this.tableRowsPerPage = event.rows;

    this.fetchPayments();
  }

  isNewPayment(): boolean {
    const idValue = this.paymentForm.value.id;
    return idValue === null || idValue === undefined;
  }

  filterPaymentsByName(): void {
    this.currentTablePage = 0;
    
    this.fetchPayments();
  }

  fetchPayments(): void {
    this.paymentsService.getPaginated(this.currentTablePage + 1, this.tableRowsPerPage, this.nameFilter)
      .subscribe(response => { 
        this.payments = <Payment[]> response.body;
        this.totalPaymentRecords = <number> response.headers.get('X-Total-Count');
    });
  }

  cleanPaymentFormFields(): void {
    this.paymentForm = this.formBuilder.group({
      id:[null],
      name: ['', Validators.required],
      username: ['', Validators.required],
      value: [null, Validators.required],
      date: ['', Validators.required],
      title: [''],
      isPayed: [false, Validators.required]
    });
  }

  fillPaymentFormFields(payment: Payment): void {
    this.paymentForm = this.formBuilder.group({
      id: [payment.id],
      name: [payment.name, Validators.required],
      username: [payment.username, Validators.required],
      value: [payment.value, Validators.required],
      date: [payment.date, Validators.required],
      title: payment.title,
      isPayed: [payment.isPayed, Validators.required]
    });
  }

  showCreatePaymentDialog() {
    this.cleanPaymentFormFields();
    this.paymentFormSubmitted = false;
    this.paymentRegisterDialogPurpose = 'Cadastrar'
    this.showPaymentRegisterDialog = true;
  }

  showUpdatePaymentDialog(payment: Payment) {
    this.fillPaymentFormFields(payment);
    this.paymentFormSubmitted = false;
    this.paymentRegisterDialogPurpose = 'Editar'
    this.showPaymentRegisterDialog = true;
  }

  hidePaymentRegisterDialog(): void {
    this.showPaymentRegisterDialog = false;
    this.paymentFormSubmitted = false;
    this.cleanPaymentFormFields();
  }

  savePayment(): void {
    this.paymentFormSubmitted = true;

    let inputPayment = {
      id: this.paymentForm.value.id,
      name: this.paymentForm.value.name,
      username: this.paymentForm.value.username,
      value: this.paymentForm.value.value,
      date: this.paymentForm.value.date,
      title: this.paymentForm.value.title,
      isPayed: this.paymentForm.value.isPayed,
    };

    if(this.isNewPayment()){
      this.paymentsService.create(inputPayment)
      .subscribe(
        response => {
          this.fetchPayments();
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'O pagamento foi cadastrado', life: 3000});
        },
        error => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível cadastrar o pagamento', life: 3000});
        });
    } else {
      this.paymentsService.update(inputPayment)
      .subscribe(
        response => {
          this.fetchPayments();
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'O pagamento foi atualizado', life: 3000});
        },
        error => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível atualizar o pagamento', life: 3000});
        });
    }

    this.hidePaymentRegisterDialog();
  }

  deletePayment(payment: Payment): void {
    this.confirmationService.confirm({
      message: `Usuário: ${payment.name}<br />
                Título: ${payment.title}<br />
                Data: ${this.datePipe.transform(payment.date, 'd MMM y, h:mm a')}<br />
                Valor: ${this.currencyPipe.transform(payment.value, 'BRL')}`,
      header: 'Excluir pagamento',
      accept: () => {
        this.paymentsService.delete(payment.id)
        .subscribe(
          response => {
            this.fetchPayments();
            this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'O pagamento foi excluído', life: 3000});
          },
          error => {
            this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível excluir o pagamento', life: 3000});
        });
      }
    });
  }
}
