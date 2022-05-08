import {
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControlName,
  NgControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { ValidatorsErrors } from "src/app/shared/enums/ValidatorsErrors.enum";

const INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  providers: [INPUT_VALUE_ACCESSOR],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder = "";
  @Input() type: string;
  @Input() disabled = false;
  @Input() icon: string;

  @Output() changeEvent = new EventEmitter();

  hidePassword = true;
  formControl: NgControl;

  private IS_REQUIRED_MESSAGE = "Este campo é obrigatório";
  private IS_INVALID_EMAIL = "Insira um e-mail válido";
  private IS_PASSWORD_NOT_SAME = "As senhas devem ser iguais";

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);

    if (ngControl instanceof FormControlName) {
      this.formControl = ngControl;
    }
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getFormControlError(): string | void {
    const isRequiredError = this.formControl?.hasError(
      ValidatorsErrors.ERROR_REQUIRED
    );

    if (isRequiredError) {
      return this.IS_REQUIRED_MESSAGE;
    }

    const isInvalidEmail = this.formControl?.hasError(
      ValidatorsErrors.ERROR_EMAIL_EMAIL
    );

    if (isInvalidEmail) {
      return this.IS_INVALID_EMAIL;
    }

    const isNotSamePassword = this.formControl?.hasError(
      ValidatorsErrors.ERROR_NOT_SAME
    );

    if (isNotSamePassword) {
      return this.IS_PASSWORD_NOT_SAME;
    }

    return;
  }
}
