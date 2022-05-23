import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormInputComponent),
  multi: true,
};

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [INPUT_VALUE_ACCESSOR]
})
export class FormInputComponent implements ControlValueAccessor {

  @Input() inputId: string;
  @Input() label: string;
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() showError = false;
  @Input() errorMessage = '';
  @Input() labelSmall = false;

  private inputValue: any;

  get value() {
    return this.inputValue;
  }

  set value(data: any) {
    if (data !== this.inputValue) {
      this.inputValue = data;
      this.onChangeInput(data);
    }
  }

  constructor() { }

  onChangeInput: (_: any) => void = () => {};
  onTouchedInput: () => void = () => {};

  writeValue(data: any): void {
    this.value = data;
  }

  registerOnChange(fn: any): void {
    this.onChangeInput = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedInput = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur() {
    this.onTouchedInput();
  }
}
