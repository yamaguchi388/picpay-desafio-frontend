import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ICredentials } from "src/app/shared/interfaces";
import { FormError } from "src/app/shared/lib/formError/FormError";

@Component({
  selector: "app-sign-in-form",
  templateUrl: "./sign-in-form.component.html",
  styleUrls: ["./sign-in-form.component.scss"],
})
export class SignInFormComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<ICredentials>();

  form: FormGroup;

  hidePassword = true;

  constructor(private readonly formBuilder: FormBuilder) {}

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

  signIn() {
    const credentials: ICredentials = this.form.getRawValue();

    this.submitEvent.emit(credentials);
  }
}
