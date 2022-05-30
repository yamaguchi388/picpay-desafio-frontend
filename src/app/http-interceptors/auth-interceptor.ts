import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.includes("signin") && !req.url.includes("signup")) {
      const authToken = this.auth.token;

      const authReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${authToken}`),
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
