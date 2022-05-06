import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  Self,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgControl,
  NgForm,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnDestroy, ControlValueAccessor {
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder = "";
  @Input() type: string;
  @Input() disabled = false;
  @Input() icon: string;

  @Output() changeEvent = new EventEmitter();

  hidePassword = true;

  private inputSubscription$: Subscription;
  private innerValue: string;
  private IS_REQUIRED_MESSAGE = "Este campo é obrigatório";
  private IS_INVALID_EMAIL = "Insira um e-mail válido";

  constructor(@Optional() @Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;

    if (this.ngControl) {
      this.inputSubscription$ = this.ngControl.valueChanges.subscribe({
        next: (res) => this.onChange(res),
      });
    }
  }

  ngOnDestroy(): void {
    this.inputSubscription$.unsubscribe();
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

  onChange(value: "text" | "number") {
    this.changeEvent.emit(value);
  }

  clearValue() {
    this.value = "";
  }

  getFormControlError(): string | void {
    const isRequiredError = this.ngControl?.hasError("required");

    if (isRequiredError) {
      return this.IS_REQUIRED_MESSAGE;
    }

    const isInvalidEmail = this.ngControl?.hasError("email");

    if (isInvalidEmail) {
      return this.IS_INVALID_EMAIL;
    }

    return;
  }
}
