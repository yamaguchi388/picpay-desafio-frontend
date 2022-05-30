import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ToastService } from "angular-toastify";

import { IPayment } from "src/app/interfaces/IPayment";
import { PaymentsService } from "src/app/services/payments/payments.service";

@Component({
  selector: "app-delete-dialog",
  templateUrl: "./delete-dialog.component.html",
  styleUrls: ["./delete-dialog.component.scss"],
})
export class DeleteDialogComponent {
  @Input() modalState: boolean = true;
  @Input() payment: IPayment;

  @Output() onClose = new EventEmitter<boolean>();

  constructor(
    private paymentsService: PaymentsService,
    private toastService: ToastService
  ) {}

  closeEvent(event?: HTMLElement) {
    if (event.className == "modal" || event.className == "close") {
      this.onClose.emit(false);
    }
  }

  confirm() {
    this.paymentsService.deletePayment(this.payment.id).subscribe(
      (data) => {
        this.toastService.info("Pagamento excluído com sucesso.");

        this.onClose.emit(true);
      },
      (error) => {
        this.toastService.error("Ocorreu um erro ao excluir o pagamento.");
        this.onClose.emit(false);
      }
    );
  }
}
