/* eslint-disable no-unused-vars */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authenticate } from './../state/actions/auth-state.actions';
import { Authentication } from 'src/app/shared/types/authentication.type';
import { Component } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { switchMap } from 'rxjs/operators';
import { ROUTES } from '../../shared/consts/routes';

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
    this.store
      .dispatch(new Authenticate(this.authentication))
      .pipe(switchMap(() => this.router.navigateByUrl(ROUTES.PAYMENTS)))
      .subscribe({
        error: (err) => this.notificationService.error(err)
      });
  }

  get authentication(): Authentication {
    return this.authForm.value as Authentication;
  }
}
