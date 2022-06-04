import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { authActions } from "../../auth/ngrx/auth.actions";
import { loginFormGroup } from "./login.config";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  hide = true;
  formGroup = loginFormGroup();
  constructor(private store: Store) {}

  ngOnInit(): void {}

  login() {
    if (this.formGroup.valid) {
      this.store.dispatch(authActions.login(this.formGroup.value));
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
