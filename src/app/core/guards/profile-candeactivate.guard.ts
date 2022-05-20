import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IFormDeactivate } from './iform-candeactivate';

@Injectable()
export class ProfileCanDeactivateGuard implements CanDeactivate<IFormDeactivate>{

  constructor() { }

  canDeactivate(component: IFormDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('Profile Deactivate Guard:');

    return component.canDisable();
  }

}
