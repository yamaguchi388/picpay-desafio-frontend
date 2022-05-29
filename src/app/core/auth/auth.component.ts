/* eslint-disable no-unused-vars */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authenticate } from './../state/actions/auth-state.actions';
import { Authentication } from 'src/app/shared/types/authentication.type';
import { Component } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ROUTES } from '../../shared/consts/routes';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

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
    private notificationService: NotificationService,
    private store: Store,
    private router: Router
  ) {}

  authenticate() {
    this.dispatchAuth()
      .pipe(map(() => this.navigateToPaymentsRoutes()))
      .subscribe({
        error: (err) => this.showErrorMessage(err)
      });
  }

  showErrorMessage(err: string) {
    this.notificationService.error(err);
  }

  dispatchAuth() {
    return this.store.dispatch(new Authenticate(this.authentication));
  }

  navigateToPaymentsRoutes() {
    return this.router.navigateByUrl(ROUTES.PAYMENTS);
  }

  get authentication(): Authentication {
    return this.authForm.value as Authentication;
  }
}
