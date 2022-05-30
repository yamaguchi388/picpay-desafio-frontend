import { Injectable } from "@angular/core";

import { ICreateUser } from "../../interfaces/IUser";
import { Validator } from "./validator";

interface Validation {
  valid: boolean;
  key?: string;
}

@Injectable()
export class SignupValidator {
  constructor(private validators: Validator) {}

  public isValid(user: ICreateUser): Validation {
    const nameValidation = this.validators.nameValidation(user.nome);
    if (!nameValidation.valid) return nameValidation;

    const emailValidation = this.validators.emailValidation(user.email);
    if (!emailValidation.valid) return emailValidation;

    const passwordValidation = this.validators.passwordValidation(
      user.password
    );
    if (!passwordValidation.valid) return passwordValidation;

    const passwordConfirmationValidation =
      this.validators.passwordConfirmationValidation(
        user.password,
        user.passwordConfirmation
      );
    if (!passwordConfirmationValidation.valid)
      return passwordConfirmationValidation;

    return { valid: true };
  }
}
