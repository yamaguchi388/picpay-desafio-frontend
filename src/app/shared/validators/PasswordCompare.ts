import { FormGroup } from '@angular/forms';

export class PasswordCompare {
  static comparePasswords(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) { return; }

    const password = passwordControl?.value;
    const confirmPassword = confirmPasswordControl?.value;

    let mathError = null;

    if (password !== confirmPassword) {
      mathError = { notSame: true };
    }

    passwordControl.setErrors(mathError);
    confirmPasswordControl.setErrors(mathError);

    return null;
  }
}
