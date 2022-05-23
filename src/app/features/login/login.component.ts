import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../core/auth/auth.service';
import { FormValidationsService } from './../../shared/services/form-validations/form-validations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hasLoginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private formValidationsService: FormValidationsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  getErrorMessage(fieldName: string, control: AbstractControl) {
    return this.formValidationsService.getErrorMsg(fieldName, control.errors);
  }

  verifyHasError(control: AbstractControl) {
    return !control.valid && control.touched;
  }

  onSubmitLoginForm() {
    this.authService.authenticate(this.loginForm.value)
      .subscribe(
        (res) => {
          this.hasLoginError = false;
          this.router.navigate(['dashboard']);
        },
        (err) => {
          this.hasLoginError = true;
          console.log(err);
        }
    );
  }

}
