import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { SearchOptions } from "@/app/core/models/search-options.model";
import { PpModalComponent } from "@/app/shared/components/modal/pp-modal.component";
import { Payment } from "./models/payment.model";
import { PaymentService } from "./services/payment.service";
import { Title } from "@angular/platform-browser";
import { PaymentResponse } from "./models/payment-response.model";

@Component({
  selector: "my-payments",
  templateUrl: "./my-payments.component.html",
  styleUrls: ["./my-payments.component.scss"],
})
export class MyPaymentsComponent implements OnInit, OnDestroy {
  searchOptions = new SearchOptions("name");
  payments: PaymentResponse;
  selectedPayment: Payment = new Payment();
  modalTitle: string;
  paymentsSubscription: Subscription;

  @ViewChild("modalPayment") modalPayment: PpModalComponent;
  @ViewChild("modalDeletePayment") modalDeletePayment: PpModalComponent;

  paymentForm = new FormGroup({
    name: new FormControl("", {
      validators: [Validators.required],
    }),
    value: new FormControl(null, {
      validators: [Validators.required],
    }),
    date: new FormControl("", {
      validators: [Validators.required],
    }),
    title: new FormControl(""),
  });

  constructor(
    private paymentService: PaymentService,
    private titleService: Title,
    private toastr: ToastrService
  ) {}
  

  ngOnInit(): void {
    this.titleService.setTitle("PayFriends - Meus pagamentos");
    this.getMyPayments();
  }

  ngOnDestroy(): void {
    this.paymentsSubscription.unsubscribe();
  }

  newPayment() {
    this.modalTitle = "Adicionar pagamento";
    this.selectedPayment = new Payment();
    this.paymentForm.reset();
    this.updatePaymentForm(this.selectedPayment);
    this.modalPayment.toggle();
  }

  getMyPayments() {
    this.paymentsSubscription = this.paymentService
      .getPayments(this.searchOptions)
      .subscribe((response) => {
        this.payments = response;
      });
  }

  onSort({ prop, sort }) {
    this.searchOptions.sortBy = prop;
    this.searchOptions.order = sort;
    this.getMyPayments();
  }

  onSearch(search: string) {
    this.searchOptions.search = search;
    this.getMyPayments();
  }

  onPageSizeChange(limit: number) {
    this.searchOptions.limit = limit;
    this.searchOptions.page = 1;
    this.getMyPayments();
  }

  onPagechanged(page: number) {
    this.searchOptions.page = page;
    this.getMyPayments();
  }

  openModalEdit(payment: Payment) {
    this.modalTitle = "Editar pagamento";
    this.selectedPayment = payment;
    this.updatePaymentForm(payment);
    this.modalPayment.toggle();
  }

  openModalDelete(payment: Payment) {
    this.selectedPayment = payment;
    this.modalDeletePayment.toggle();
  }

  onDelete() {
    this.paymentService.deletePayment(this.selectedPayment.id).subscribe(() => {
      this.selectedPayment = new Payment();
      this.modalDeletePayment.toggle();
      this.getMyPayments();
      this.toastr.success("Pagamento excluido com sucesso")
    });
  }

  updatePaymentForm({ name, value, title, date }: Payment) {
    this.paymentForm.patchValue({
      name: name,
      value: value,
      date: date.replace("Z", ""),
      title: title,
    });
  }

  onSubmit() {
    const { name, date, title, value } = this.paymentForm.value;
    this.selectedPayment = {
      ...this.selectedPayment,
      name,
      date,
      title,
      value,
    };

    if (this.selectedPayment.id) {
      this.editPayment(this.selectedPayment);
    } else {
      this.createPayment(this.selectedPayment);
    }
  }

  createPayment(payment: Payment) {
    this.paymentService.createPayment(payment).subscribe(() => {
      this.getMyPayments();
      this.modalPayment.toggle();
      this.toastr.success("Pagamento criado com sucesso");
    });
  }

  editPayment(payment: Payment) {
    this.paymentService.editPayment(payment).subscribe(() => {
      this.getMyPayments();
      this.modalPayment.toggle();
      this.toastr.success("Pagamento editado com sucesso");
    });
  }
}
