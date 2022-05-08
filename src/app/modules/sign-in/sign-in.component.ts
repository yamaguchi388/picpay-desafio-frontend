import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ICredentials } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  form: FormGroup;

  isUserNotFoundMessage = '';
  isLoading = false;
  hidePassword = true;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly toastr: ToastrService,
    private readonly formBuilder: FormBuilder
  ) {}

  get formIsInvalid() {
    return this.form.invalid;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  signIn() {
    this.isLoading = true;

    const credentials: ICredentials = this.form.getRawValue();

    this.authService
      .signIn(credentials)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.userService.setUserOnSession(res);
          this.toastr.success('Login realizado com sucesso');
          this.router.navigate(['/']);
        },
        error: ({ error: { errors } }: HttpErrorResponse) => {
          this.isLoading = false;
          this.toastr.error(errors[0]);
        },
      });
  }
}
