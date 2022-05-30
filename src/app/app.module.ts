import ptBr from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AngularToastifyModule, ToastService } from "angular-toastify";

import { AppComponent } from "./app.component";

import { httpInterceptorProviders } from "./http-interceptors";
import { Validator } from "./services/validators/validator";
import { AuthService } from "./services/auth/auth.service";
import { routes } from "./routes";

registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularToastifyModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-PT" },
    AuthService,
    ToastService,
    httpInterceptorProviders,
    Validator,
  ],
})
export class AppModule {}
