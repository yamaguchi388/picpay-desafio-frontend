import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { catchError, first, mergeMap } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UserService } from "src/app/shared/services/user/user.service";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
  private readonly LOGIN_ENDPOINT = "account";

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const user = this.userService.getLoggedUser();

    const { apiUrl } = environment;

    const url = `${apiUrl}/${this.LOGIN_ENDPOINT}`;
    const isLoginRoute = req.url.includes(url);

    if (isLoginRoute) {
      return next.handle(req);
    }

    return this.authService.signIn(user).pipe(
      mergeMap(() => {
        return next.handle(req);
      }),
      catchError((res) => {
        this.toastr.info("Você precisa realizar o login novamente.");
        this.authService.logout();
        this.router.navigate(["/sign-in"]);
        throw res;
      })
    );
  }
}
