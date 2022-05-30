import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Routes } from "../../constants/routes";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public signinFormActive: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSignup() {
    this.signinFormActive = false;
  }

  onSignin(event: boolean) {
    if (event) this.router.navigate([Routes.dashboard]);
    this.signinFormActive = true;
  }
}
