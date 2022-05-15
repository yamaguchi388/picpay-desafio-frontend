import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ICredentials } from "src/app/shared/interfaces";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent {
  isUserNotFoundMessage = "";
  isLoading = false;
  hidePassword = true;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  signIn(credentials: ICredentials) {
    this.authService
      .signIn(credentials)
      .pipe(first())
      .subscribe({
        next: (res) => console.log(res),
        error: ({ errors }) => {
          if (errors.length) {
            this.isUserNotFoundMessage = errors[0];
          }
        },
      });
  }
}
