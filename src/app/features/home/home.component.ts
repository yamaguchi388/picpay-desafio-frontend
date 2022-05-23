import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/shared/models/payment';
import { User } from 'src/app/shared/models/user';
import { tap } from 'rxjs/operators';
import { AuthService } from './../../core/auth/auth.service';
import { PaymentsService } from './../../shared/services/payments/payments.service';

type OrderBy = 'desc' | 'asc';

type MessageAlert = {
  message: string,
  type: string,
  isVisible: boolean,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  showAddPaymentModal = false;
  showConfirmDeletePaymentModal = false;
  payments$: Observable<Payment[]>;

  /**
   * O total de páginas para serem mostradas no componente de paginação está fixado,
   * já que o endpoint /tasks não retorna o total de páginas.
   */
  numberOfPages = 5;

  paymentsListCurrentPage = 1;
  paymentsListLimit = 5;
  selectedPayment: Payment;

  activedSortCol = 'date';
  activedOrderType: OrderBy = 'desc';

  searchValue: string;
  searchCallbackLoading = true;

  messageAlert: MessageAlert;

  constructor(
    private paymentsService: PaymentsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.onRefreshData();
  }

  onRefreshData = () => {
    this.payments$ = this.paymentsService.getPayments(
      {
        page: this.paymentsListCurrentPage,
        limit: this.paymentsListLimit,
        sort: this.activedSortCol,
        order: this.activedOrderType,
        name: this.searchValue,
      }
    ).pipe(
      tap((res) => this.searchCallbackLoading = false )
    );
  }

  handleSavePayment = (payment: Payment, isNewPayment = true) => {
    if (isNewPayment) {
      this.handleAddPayments(payment);
    } else {
      const newPayment = {
        id: this.selectedPayment.id,
        ...payment,
      };
      this.handleUpdatePayments(newPayment);
    }
  }

  handleAddPayments = (payment: Payment) => {
    this.paymentsService.addPayment(payment)
      .subscribe(
        (res) => {
          this.handleShowMessageAlert('Novo pagamento cadastrado com sucesso!', 'success');
          this.onRefreshData();
        },
        (error) => {
          console.error(error);
          this.handleShowMessageAlert('Ocorreu um erro na sua requisição.', 'error');
        }
      );
  }

  handleUpdatePayments = (payment: Payment) => {
    this.selectedPayment = null;
    this.paymentsService.updatePayment(payment)
      .subscribe(
        (res) => {
          this.handleShowMessageAlert('Pagamento editado com sucesso!', 'success');
          this.onRefreshData();
        },
        (error) => {
          console.error(error);
          this.handleShowMessageAlert('Ocorreu um erro na sua requisição.', 'error');
        }
      );
  }

  handleUpdatePaidOut = (payment: Payment): void => {
    const newPayment = { ...payment, isPayed: !payment.isPayed };
    this.handleUpdatePayments(newPayment);
  }

  handleOrderByCol = (col: string) => {
    if (col === this.activedSortCol) {
      this.activedOrderType = this.activedOrderType === 'asc' ? 'desc' : 'asc';
    } else {
      this.activedSortCol = col;
      this.activedOrderType = 'desc';
    }

    this.onRefreshData();
  }

  handleDeletePayment = (): void => {
    this.paymentsService.deletePayment(this.selectedPayment.id)
      .subscribe(
        (res) => {
          this.onRefreshData();
          this.handleShowMessageAlert('Pagamento deletado com sucesso!', 'success');
        },
        (error) => {
          console.error(error);
          this.handleShowMessageAlert('Ocorreu um erro na sua requisição.', 'error');
        }
      );
    this.selectedPayment = null;
  }

  handleSearch = (value: string): void => {
    this.searchValue = value;
    this.searchCallbackLoading = true;
    this.onRefreshData();
  }

  onChangeLimitSelect = (value) => {
    this.paymentsListLimit = value;
    this.onRefreshData();
  }

  onShowPaymentModal = (payment?: Payment): void => {
    this.selectedPayment = payment;
    this.showAddPaymentModal = true;
  }

  onShowConfirmDeletePaymentModal = (payment: Payment): void => {
    this.selectedPayment = payment;
    this.showConfirmDeletePaymentModal = true;
  }

  handleClosePaymentModal = (): void => {
    this.showAddPaymentModal = false;
    this.selectedPayment = null;
  }

  handleCloseConfirmDeletePaymentModal = (): void => {
    this.showConfirmDeletePaymentModal = false;
    this.selectedPayment = null;
  }

  changePaymentsListPage = (page): void => {
    this.paymentsListCurrentPage = page;
    this.onRefreshData();
  }

  handleShowMessageAlert = (message: string, type: string) => {
    this.messageAlert = {
      isVisible: true,
      message,
      type,
    };
  }

  handleHideMessage = () => {
    this.messageAlert = {
      isVisible: false,
      message: '',
      type: '',
    };
  }
}
