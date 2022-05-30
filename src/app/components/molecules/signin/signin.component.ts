import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/services/auth/auth.service";

import { SigninValidator } from "src/app/services/validators/signin.validator";
import { CreateUserFactory } from "src/app/factorys/create-user.factory";
import { ToastService } from "angular-toastify";
import { ServerResponses } from "src/app/constants/server.responses";
import { Exceptions } from "src/app/constants/exceptions";
import { inputType } from "src/app/enums/inputType";
import { Routes } from "src/app/constants/routes";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup;
  @ViewChild("password") inputPassword: ElementRef;

  public passwordVisible: boolean = false;
  public loading: boolean;

  @Output() onSignup: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(
    private usersService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private signinValidator: SigninValidator,
    private formBuilder: FormBuilder,
    private createUserFactory: CreateUserFactory,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.signinForm = this.formBuilder.group(this.createUserFactory.signin());
  }

  enablePasswordVisibility() {
    this.inputPassword.nativeElement.type = inputType.text;
    this.passwordVisible = true;
  }

  disablePasswordVisibility() {
    this.inputPassword.nativeElement.type = inputType.password;
    this.passwordVisible = false;
  }

  signin() {
    this.loading = true;
    const validation = this.signinValidator.isValid(this.signinForm.value);

    if (!validation.valid) {
      this.invalidate(validation.key);
      this.loading = false;
      return;
    }

    this.usersService.signin(this.signinForm.value).subscribe(
      (success) => {
        this.navigate();
      },
      (error) => {
        if (error?.error == ServerResponses.incorrectPassword) {
          this.toastService.error(Exceptions.incorrectPassword);
        } else if (error?.error == ServerResponses.cannotFindUser) {
          this.toastService.error(Exceptions.cannotFindUser);
        } else {
          this.toastService.error(Exceptions.error);
        }
        this.loading = false;
      },
      () => (this.loading = false)
    );
  }

  validate(key: string) {
    const element = document.getElementById(key);
    this.renderer.removeClass(element, "invalid");
  }

  invalidate(key: string) {
    const element = document.getElementById(key);
    this.renderer.addClass(element, "invalid");
  }

  navigate() {
    this.router.navigate([Routes.dashboard]);
  }

  signup() {
    this.onSignup.emit(true);
  }
}
