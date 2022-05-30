import { Injectable } from "@angular/core";
import { IUser } from "src/app/interfaces/IUser";
import { IValidation } from "src/app/interfaces/IValidation";

import { Validator } from "./validator";

interface ValidationResult {
  valid: boolean;
  key?: string;
}

@Injectable()
export class ProfileValidator implements IValidation<IUser> {
  constructor(private validators: Validator) {}

  public isValid(user: IUser): ValidationResult {
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
