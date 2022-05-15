import { FormGroup } from "@angular/forms";

export class FormError {
  static IS_REQUIRED_MESSAGE = "Este campo é obrigatório";
  static IS_INVALID_EMAIL = "Insira um e-mail válido";

  static verifyFormControlIsInvalid(form: FormGroup, key: string) {
    return form.get(key)?.invalid;
  }

  static getFormControlError(form: FormGroup, key: string) {
    const isRequiredError = form.get(key)?.hasError("required");

    if (isRequiredError) {
      return this.IS_REQUIRED_MESSAGE;
    }

    const isInvalidEmail = form.get(key)?.hasError("email");

    if (isInvalidEmail) {
      return this.IS_INVALID_EMAIL;
    }

    return;
  }
}
