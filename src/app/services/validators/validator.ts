import { Injectable } from "@angular/core";
import { ToastService } from "angular-toastify";
import { Keys } from "src/app/constants/keys";
import { Exceptions } from "../../constants/exceptions";

interface ValidationResult {
  valid: boolean;
  key?: string;
}

@Injectable()
export class Validator {
  constructor(private toastService: ToastService) {}

  public emailValidation(email: string): ValidationResult {
    const emailValidation = new RegExp("^(.+)@(.+)$");
    const validEmail = emailValidation.test(email);

    if (!validEmail) {
      this.toastService.error(Exceptions.invalidEmail);
      return {
        valid: false,
        key: Keys.email,
      };
    }

    return { valid: true };
  }

  public passwordValidation(password: string): ValidationResult {
    if (!password || password.trim() == "") {
      this.toastService.error(Exceptions.invalidPassword);
      return {
        valid: false,
        key: Keys.password,
      };
    } else if (password.length < 6) {
      this.toastService.error(Exceptions.invalidPasswordLength);
      return {
        valid: false,
        key: Keys.password,
      };
    }

    return { valid: true };
  }

  public passwordConfirmationValidation(
    password: string,
    passwordConfirmation: string
  ): ValidationResult {
    if (password != passwordConfirmation) {
      this.toastService.error(Exceptions.invalidPasswordConfirmation);

      return {
        valid: false,
        key: Keys.passwordConfirmation,
      };
    }

    return { valid: true };
  }

  public nameValidation(name: string): ValidationResult {
    if (name.trim() == "") {
      this.toastService.error(Exceptions.invalidName);
      return {
        valid: false,
        key: Keys.name,
      };
    } else if (name.length < 3) {
      this.toastService.error(Exceptions.invalidNameLength);
      return {
        valid: false,
        key: Keys.name,
      };
    }

    return { valid: true };
  }

  public usernameValidation(username: string): ValidationResult {
    if (username.trim() == "") {
      this.toastService.error(Exceptions.invalidUsername);
      return {
        valid: false,
        key: Keys.username,
      };
    } else if (username.length < 3) {
      this.toastService.error(Exceptions.invalidNameLength);
      return {
        valid: false,
        key: Keys.username,
      };
    }

    return { valid: true };
  }

  public numberValidation(value: number): ValidationResult {
    if (value == undefined) {
      this.toastService.error(Exceptions.invalidNumber);
      return {
        valid: false,
        key: Keys.value,
      };
    } else if (value < 0) {
      this.toastService.error(Exceptions.negativeNumber);
      return {
        valid: false,
        key: Keys.value,
      };
    }

    return { valid: true };
  }

  titleValidation(title: string): ValidationResult {
    if (!title || title.trim() == "") {
      this.toastService.error(Exceptions.titleInvalid);
      return {
        valid: false,
        key: Keys.title,
      };
    }

    return { valid: true };
  }

  dateValidation(date: Date): ValidationResult {
    if (!date) {
      this.toastService.error(Exceptions.dateInvalid);
      return {
        valid: false,
        key: Keys.picker,
      };
    }

    return { valid: true };
  }
}
