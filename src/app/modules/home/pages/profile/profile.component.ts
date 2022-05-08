import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { IUser } from "src/app/shared/interfaces";

import { UserService } from "src/app/shared/services/user/user.service";
import { PasswordCompare } from "src/app/shared/validators";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  private user: IUser;

  form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly toastrService: ToastrService
  ) {}

  get formIsInvalid() {
    return this.form.invalid;
  }

  ngOnInit(): void {
    this.getLoggedUser();
    this.buildForm();
  }

  private buildForm() {
    const { id, name, email, password } = this.user;

    this.form = this.formBuilder.group(
      {
        id: [id, Validators.required],
        name: [name, Validators.required],
        email: [email, [Validators.required, Validators.email]],
        password: [password, Validators.required],
        confirmPassword: [password, Validators.required],
      },
      { validators: PasswordCompare.comparePasswords }
    );
  }

  getLoggedUser() {
    this.user = this.userService.getLoggedUser();
  }

  updateUser() {
    const { id, name, email, password } = this.form.getRawValue();
    this.userService
      .update({ id, name, email, password })
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastrService.success("Usuário alterado com sucesso.");
        },
      });
  }

  resetForm() {
    const { id, name, email, password } = this.user;
    this.form.patchValue({ name, email, password, confirmPassword: password });
  }
}
