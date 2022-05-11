import { AbstractControl } from '@angular/forms';

export function lowercaseValidator(control: AbstractControl) {
  const value = control.value as string;

  if (value !== value.toLocaleLowerCase()) {
    return { lowercase: true };
  }

  return null;
}