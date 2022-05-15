import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ICredentials } from "src/app/shared/interfaces";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { first } from "rxjs/operators";
import { UserService } from "src/app/shared/services/user/user.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent {
  isUserNotFoundMessage = "";
  isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private userService: UserService
  ) {}

  signIn(credentials: ICredentials) {
    this.isLoading = true;

    this.authService
      .signIn(credentials)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.userService.setUserOnSession(res);
          this.router.navigate(["/"]);
        },
        error: ({ errors }) => {
          if (errors.length) {
            this.isUserNotFoundMessage = errors[0];
          }
          this.isLoading = false;
        },
      });
  }
}
