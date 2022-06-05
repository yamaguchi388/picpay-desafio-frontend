import { Injectable } from "@angular/core";
import {
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { selectUser } from "./ngrx/auth.selector";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
  constructor(private store: Store, private router: Router) {}
  canLoad(
    _route: Route,
    _segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(selectUser).pipe(
      map((user) => {
        if (user) return true;
        return this.router.parseUrl("/");
      })
    );
  }
}
