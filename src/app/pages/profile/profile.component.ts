import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "angular-toastify";
import { Subscription } from "rxjs";
import { Exceptions } from "src/app/constants/exceptions";
import { Routes } from "src/app/constants/routes";
import { CreateUserFactory } from "src/app/factorys/create-user.factory";
import { IUser } from "src/app/interfaces/IUser";
import { AuthService } from "src/app/services/auth/auth.service";
import { ProfileValidator } from "src/app/services/validators/profile.validator";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  private routeSub: Subscription;
  public user: IUser;
  public form: FormGroup = this.formBuilder.group(
    this.createUserFactory.create()
  );
  public passwordChange: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private createUserFactory: CreateUserFactory,
    private formBuilder: FormBuilder,
    private profileValidator: ProfileValidator
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.getUser(params["id"]);
    });
  }

  getUser(id: number) {
    this.authService.getUser(id).subscribe(
      (res) => {
        this.user = { ...res.body };
        this.form = this.formBuilder.group(
          this.createUserFactory.profile(this.user)
        );
      },
      (error) => {
        this.toastService.error(Exceptions.userNotAuthorized);
        this.router.navigate([Routes.login]);
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  dashboard() {
    this.router.navigate([Routes.dashboard]);
  }

  submit() {
    const validation = this.profileValidator.isValid(this.form.value);
    if (!validation?.valid) {
      return;
    }

    this.authService.updateProfile(this.form.value).subscribe(
      (success) => {
        this.toastService.info(Exceptions.updateUserSuccess);
      },
      (error) => {
        this.toastService.error(Exceptions.updateUserError);
      }
    );
  }
}
