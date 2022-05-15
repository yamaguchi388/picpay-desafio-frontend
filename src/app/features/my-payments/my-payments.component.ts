import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SearchOptions } from "@/app/core/models/search-options.model";
import { PpModalComponent } from "@/app/shared/components/modal/pp-modal.component";
import { Payment } from "./models/payment.model";
import { PaymentService } from "./services/payment.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "my-payments",
  templateUrl: "./my-payments.component.html",
  styleUrls: ["./my-payments.component.scss"],
})
export class MyPaymentsComponent implements OnInit {
  searchOptions = new SearchOptions("name");
  payments: Observable<Payment[]>;
  selectedPayment: Payment = new Payment();
  modalTitle: string;

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
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("PayFriends - Meus pagamentos");
    this.getMyPayments();
  }

  newPayment() {
    this.modalTitle = "Adicionar pagamento";
    this.selectedPayment = new Payment();
    this.updatePaymentForm(this.selectedPayment);
    this.modalPayment.toggle();
  }

  getMyPayments() {
    this.payments = this.paymentService.getPayments(this.searchOptions);
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
    });
  }

  editPayment(payment: Payment) {
    this.paymentService.editPayment(payment).subscribe(() => {
      this.getMyPayments();
      this.modalPayment.toggle();
    });
  }
}
