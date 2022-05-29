/* eslint-disable no-unused-vars */
import { CanActivate, UrlTree } from '@angular/router';
import { AuthState } from './../state/states/auth.state';
import { AuthStateModel } from '../state/models/auth-state.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from '../../shared/consts/routes';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigateByUrl(ROUTES.AUTH);
    return false;
  }

  get isAuthenticated(): boolean {
    return this.store.selectSnapshot<AuthStateModel>(AuthState).isAuthenticated;
  }
}
