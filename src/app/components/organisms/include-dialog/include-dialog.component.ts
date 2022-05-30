import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastService } from "angular-toastify";
import { DatePickerDirective, IDatePickerConfig } from "ng2-date-picker";
import { DatePickerDefault } from "src/app/constants/date.picker.default";
import { PaymentFactory } from "src/app/factorys/payment.factory";
import { ICreatePayment } from "src/app/interfaces/IPayment";
import { DateHelper } from "src/app/services/date-helper/date.helper";
import { PaymentsService } from "src/app/services/payments/payments.service";
import { IncludeValidator } from "src/app/services/validators/include.validator";

@Component({
  selector: "app-include-dialog",
  templateUrl: "./include-dialog.component.html",
  styleUrls: ["./include-dialog.component.scss"],
})
export class IncludeDialogComponent implements OnInit {
  config: IDatePickerConfig = {
    ...DatePickerDefault,
  };
  @ViewChild("dateDirectivePicker") dpDayPicker: DatePickerDirective;

  @Input() modalState: boolean = true;
  @Output() onClose = new EventEmitter<boolean>();

  public payment: FormGroup;
  public dateIsValid = true;

  constructor(
    private paymentFactory: PaymentFactory,
    private paymentService: PaymentsService,
    private toastService: ToastService,
    private includeValidator: IncludeValidator,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private dateHelper: DateHelper
  ) {}

  ngOnInit() {
    this.payment = this.formBuilder.group(this.paymentFactory.create());
  }

  closeEvent(event?: HTMLElement) {
    if (event.className == "modal" || event.className == "close") {
      this.payment = this.formBuilder.group(this.paymentFactory.create());
      this.onClose.emit(false);
    }
  }

  confirm() {
    const validation = this.includeValidator.isValid(this.payment.value);

    if (!validation.valid) {
      this.invalidate(validation.key);
      return;
    }

    this.paymentService.includePayment(this.payment.value).subscribe(
      (data) => {
        this.toastService.info(`Pagamento criado com sucesso!`);

        this.payment = this.formBuilder.group(this.paymentFactory.create());
        this.onClose.emit(true);
      },
      (error) => {
        this.toastService.error(`Ocorreu um erro ao criar o pagamento.`);
      }
    );
  }

  validate(key: string) {
    if (key == "picker") {
      this.dateIsValid = true;
      return;
    }

    const element = document.getElementById(key);
    this.renderer.removeClass(element, "invalid");
  }

  invalidate(key: string) {
    if (key == "picker") {
      this.dateIsValid = false;
      return;
    }

    const element = document.getElementById(key);
    this.renderer.addClass(element, "invalid");
  }

  datePickerChanges(event: string) {
    const date = this.dateHelper.convert(event);
    this.payment.setValue({ ...this.payment.value, date });

    this.validate("picker");
  }
}
