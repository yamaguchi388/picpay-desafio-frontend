import { Injectable } from "@angular/core";

import { ISignin } from "../../interfaces/ISignin";
import { Validator } from "./validator";

interface Validation {
  valid: boolean;
  key?: string;
}

@Injectable()
export class SigninValidator {
  constructor(private validators: Validator) {}

  public isValid(signin: ISignin): Validation {
    const emailValidation = this.validators.emailValidation(signin.email);
    if (!emailValidation.valid) return emailValidation;

    const passwordValidation = this.validators.passwordValidation(
      signin.password
    );
    if (!passwordValidation.valid) return passwordValidation;

    return { valid: true };
  }
}
