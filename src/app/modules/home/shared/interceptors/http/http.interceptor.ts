import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UserService } from "src/app/shared/services/user/user.service";

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly toastr: ToastrService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.userService.getLoggedUser();
    console.log(user);

    return next.handle(req);
  }
}
