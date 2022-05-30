import { Injectable } from "@angular/core";
import { IValidation } from "src/app/interfaces/IValidation";
import { ICreatePayment } from "../../interfaces/IPayment";

import { Validator } from "./validator";

interface ValidationResult {
  valid: boolean;
  key?: string;
}

@Injectable()
export class IncludeValidator implements IValidation<ICreatePayment> {
  constructor(private validators: Validator) {}

  public isValid(payment: ICreatePayment): ValidationResult {
    const usernameValidation = this.validators.usernameValidation(
      payment.username
    );
    if (!usernameValidation.valid) return usernameValidation;

    const nameValidation = this.validators.nameValidation(payment.name);
    if (!nameValidation.valid) return nameValidation;

    const titleValidation = this.validators.titleValidation(payment.title);
    if (!titleValidation.valid) return titleValidation;

    const dateValidation = this.validators.dateValidation(payment.date);
    if (!dateValidation.valid) return dateValidation;

    const valueValidation = this.validators.numberValidation(payment.value);
    if (!valueValidation.valid) return valueValidation;

    return { valid: true };
  }
}
