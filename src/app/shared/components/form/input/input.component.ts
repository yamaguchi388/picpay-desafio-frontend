import {
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  NgControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Subscription } from "rxjs";

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

  private inputSubscription$: Subscription;
  private innerValue: string;
  private IS_REQUIRED_MESSAGE = "Este campo é obrigatório";
  private IS_INVALID_EMAIL = "Insira um e-mail válido";

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);

    if (ngControl instanceof FormControlName) {
      this.formControl = ngControl;
    }
  }

  get value() {
    return this.innerValue;
  }

  set value(v: string) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(value: string) {
    this.changeEvent.emit(value);
  }

  getFormControlError(): string | void {
    const isRequiredError = this.formControl?.hasError("required");

    if (isRequiredError) {
      return this.IS_REQUIRED_MESSAGE;
    }

    const isInvalidEmail = this.formControl?.hasError("email");

    if (isInvalidEmail) {
      return this.IS_INVALID_EMAIL;
    }

    return;
  }
}
