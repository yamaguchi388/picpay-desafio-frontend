import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { ToastService } from "angular-toastify";

import { ISignin } from "src/app/interfaces/ISignin";
import { IAuth } from "src/app/interfaces/IAuth";
import { ICreateUser, IUser } from "src/app/interfaces/IUser";

@Injectable()
export class AuthService implements CanActivate {
  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router
  ) {}

  private _token: string | undefined;
  private _id: number;
  private baseUrl = "http://localhost:3000";

  get token(): string | undefined {
    return this._token;
  }

  get id(): number {
    return this._id;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const valid = this.token && this.token.trim() != "";

    if (!valid) {
      this.toastService.error("Usuário não autorizado!");
      this.router.navigate(["/"]);
    }

    return valid;
  }

  signin(auth: ISignin): Observable<IAuth> {
    delete auth["passwordConfirmation;"];

    return this.http.post<IAuth>(`${this.baseUrl}/signin`, auth).pipe(
      tap({
        next: (event) => {
          this._token = event?.accessToken;
          this._id = event?.user.id;

          return event;
        },
      })
    );
  }

  signup(user: ICreateUser) {
    return this.http.post<IAuth>(`${this.baseUrl}/signup`, user);
  }

  getUser(id: number): Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(`${this.baseUrl}/users/${id}`, {
      observe: "response",
    });
  }

  updateProfile(user: IUser): Observable<IUser> {
    const safeUser = { ...user };
    const { id } = safeUser;

    delete safeUser["passwordConfirmation"];
    delete safeUser["id"];

    return this.http.put<IUser>(`${this.baseUrl}/users/${id}`, safeUser);
  }

  updatePassword(user: IUser): Observable<IUser> {
    const safeUser = { ...user };
    const { id } = safeUser;

    delete safeUser["passwordConfirmation"];
    delete safeUser["id"];

    return this.http.put<IUser>(`${this.baseUrl}/users/${id}`, safeUser);
  }
}
