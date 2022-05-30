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
import { ICreatePayment, IPayment } from "src/app/interfaces/IPayment";
import { DateHelper } from "src/app/services/date-helper/date.helper";
import { PaymentsService } from "src/app/services/payments/payments.service";
import { EditValidator } from "src/app/services/validators/edit.validator";

@Component({
  selector: "app-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"],
})
export class EditDialogComponent implements OnInit {
  config: IDatePickerConfig = {
    ...DatePickerDefault,
  };
  @ViewChild("dateDirectivePicker") dpDayPicker: DatePickerDirective;
  @Input() modalState: boolean = true;
  @Input() public payment: IPayment;
  @Output() onClose = new EventEmitter<boolean>();
  public form: FormGroup;
  public dateIsValid = true;

  constructor(
    private paymentService: PaymentsService,
    private toastService: ToastService,
    private editValidator: EditValidator,
    private renderer: Renderer2,
    private dateHelper: DateHelper,
    private formBuilder: FormBuilder,
    private paymentFactory: PaymentFactory
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(this.paymentFactory.edit(this.payment));
  }

  closeEvent(event?: HTMLElement) {
    if (event.className == "modal" || event.className == "close") {
      this.onClose.emit(false);
    }
  }

  confirm() {
    const validation = this.editValidator.isValid(this.form.value);

    if (!validation.valid) {
      this.invalidate(validation.key);
      return;
    }

    this.paymentService.editPayment(this.form.value).subscribe(
      (data) => {
        this.toastService.info(`Pagamento editado com sucesso!`);

        this.onClose.emit(true);
      },
      (error) => {
        this.toastService.error(`Ocorreu um erro ao editar o pagamento.`);
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
    this.form.setValue({ ...this.form.value, date });

    this.validate("picker");
  }

  formatedDate() {
    return this.dateHelper.convertISO(this.payment.date);
  }
}
