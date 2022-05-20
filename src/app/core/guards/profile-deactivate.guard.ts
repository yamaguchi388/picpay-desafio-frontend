import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProfileComponent } from './../../profile/profile.component';

@Injectable()
export class ProfileDeactivateGuard implements CanDeactivate<ProfileComponent>{

  constructor() { }

  canDeactivate(component: ProfileComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('Profile Deactivate Guard:');

    component
    return component.changeForm();
  }

}
