import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { LoginService } from "./services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginFailed: boolean;
  loginForm = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  errorMessages = {
    email: {
      required: "O campo email é obrigatório.",
      email: "O email é inválido.",
    },
    password: {
      required: "O campo senha é obrigatório.",
    },
  };

  constructor(
    private loginService: LoginService,
    private route: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("PayFriends - Login")
  }

  async onSubmit() {
    const { email, password } = this.loginForm.value;
    const isAuthenticated = await this.loginService.authenticate({
      email,
      password,
    });
    if (isAuthenticated) {
      this.route.navigate(["/portal/meus-pagamentos"]);
    } else {
      this.loginFailed = true;
    }
  }

  buildErrorMessages(
    prop: string,
    errors: Record<string, boolean>
  ): Array<string> {
    return Object.keys(errors).map((key) => this.errorMessages[prop][key]);
  }

  get emailControl() {
    return this.loginForm.get("email");
  }

  get passwordControl() {
    return this.loginForm.get("password");
  }

  get emailInvalid() {
    const email = this.emailControl;
    return email.dirty && email.invalid;
  }

  get passwordInvalid() {
    const password = this.passwordControl;
    return password.dirty && password.invalid;
  }

  get emailErrors() {
    const { errors } = this.emailControl;
    return this.buildErrorMessages("email", errors);
  }

  get passwordErrors() {
    const { errors } = this.passwordControl;
    return this.buildErrorMessages("password", errors);
  }
}
