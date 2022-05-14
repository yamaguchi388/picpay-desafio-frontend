import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "picpay-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({});

  constructor(
    private readonly router: Router
  ) // private readonly authService: AuthService
  {}

  ngOnInit(): void {}

  public onSubmit(): void {
    this.router.navigate(["/payments"]);
  }
}
