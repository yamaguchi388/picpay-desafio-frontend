import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FormError } from "src/app/shared/lib/formError/FormError";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  isUserNotFoundMessage = "";
  isLoading = false;
  hidePassword = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  get formIsInvalid() {
    return this.form.invalid;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
    });
  }

  verifyFormControlIsInvalid(key: string) {
    return FormError.verifyFormControlIsInvalid(this.form, key);
  }

  getFormControlError(key: string): string | void {
    return FormError.getFormControlError(this.form, key);
  }
}
