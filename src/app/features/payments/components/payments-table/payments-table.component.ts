import { Component, OnInit } from '@angular/core';
import { Payment } from '../../models/payment';

import { PaymentsService } from '../../services/payments.service';
import { ConfirmationService, MessageService } from 'primeng/api';

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

  payment: Payment;
  showPaymentRegisterDialog: boolean = false;
  paymentRegisterDialogPurpose: string = '';
  paymentFormSubmitted: boolean = false;

  constructor(private paymentsService: PaymentsService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

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
    console.log(this.payment.id);
    return this.payment?.id === null || this.payment?.id === undefined;
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

  showCreatePaymentDialog() {
    this.payment = {
      id: null,
      name: '',
      username: '',
      title: '',
      date: null,
      value: null,
      isPayed: false,
    };
    this.paymentFormSubmitted = false;
    this.paymentRegisterDialogPurpose = 'Cadastrar'
    this.showPaymentRegisterDialog = true;
  }

  showUpdatePaymentDialog(payment: Payment) {
    this.payment = {...payment};
    this.paymentFormSubmitted = false;
    this.paymentRegisterDialogPurpose = 'Editar'
    this.showPaymentRegisterDialog = true;
  }

  hidePaymentRegisterDialog(): void {
    this.showPaymentRegisterDialog = false;
    this.paymentFormSubmitted = false;
    this.payment = {
      id: null,
      name: '',
      username: '',
      title: '',
      date: null,
      value: null,
      isPayed: null,
    };
  }

  savePayment(): void {
    this.paymentFormSubmitted = true;

    if(this.isNewPayment()){
      console.log('CREATE');
      this.paymentsService.create(this.payment)
      .subscribe(
        response => {
          this.fetchPayments();
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'O pagamento foi cadastrado', life: 3000});
        },
        error => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível cadastrar o pagamento', life: 3000});
        });
    } else {
      console.log('UPDATE');
      this.paymentsService.update(this.payment)
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
      message: 'Usuário: ' + payment.name + '<br />'
                + 'Título: ' + payment.title + '<br />'
                + 'Data: ' + payment.date + '<br />'
                + 'Valor: ' + payment.value,
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
