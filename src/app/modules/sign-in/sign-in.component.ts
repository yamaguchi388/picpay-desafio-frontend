import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ICredentials } from "src/app/shared/interfaces";
import { AuthService } from "src/app/shared/services/auth/auth.service";

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
    console.log(credentials);
  }
}
