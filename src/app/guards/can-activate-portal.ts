import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable()
export class CanActivatePortal implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    try {
      const isAuthenticated = JSON.parse(localStorage.getItem("authenticated"));
      if (typeof isAuthenticated === "boolean" && isAuthenticated === true) {
        return true;
      }
      this.router.navigate(["/login"]);
    } catch (error) {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
