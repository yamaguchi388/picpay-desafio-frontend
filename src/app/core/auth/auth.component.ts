/* eslint-disable no-unused-vars */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authenticate } from './../state/actions/auth-state.actions';
import { Authentication } from 'src/app/shared/types/authentication.type';
import { Component } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  handleAuthenticate() {
    this.authenticate().subscribe({
      error: () => this.notificationService.error('Usuario ou senha inválidos')
    });
  }

  @Dispatch()
  authenticate() {
    return of(new Authenticate(this.authentication));
  }

  get authentication() {
    const authentication: Authentication = this.authForm.value;
    return authentication;
  }
}
