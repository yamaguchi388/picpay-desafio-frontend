import { SnackBarService } from './../service/snack-bar.service';
import { Subscription } from 'rxjs';
import { IFormDeactivate } from './../core/guards/iform-candeactivate';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountObject } from './../models/account-object';
import { AuthService } from './../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, IFormDeactivate {
  form!: FormGroup;
  visibility!: boolean;
  profile!: AccountObject;
  subscription!: Subscription;
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(
      (info: { profile: AccountObject }) => {
        this.profile = info.profile;
      }
    );
    this.form = this.formBuilder.group({
      email: [this.profile?.email ?? '', [Validators.required, Validators.email, Validators.minLength(1)]],
      password: [this.profile?.password ?? '', [Validators.required, Validators.minLength(1)]],
      name: [this.profile?.name ?? '', [Validators.required, Validators.minLength(1)]],
      passwordConfirm: [this.profile?.password ?? '', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const user: AccountObject = {
        ...this.form.value,
        id: this.profile.id
      };

      this.authService.update(user)
        .subscribe((account: AccountObject) => {
          this.router.navigateByUrl('/payment', { state: [account] });
          this.snackBarService.success('Salvo');
        },
          (error: Error) => {
            this.errorGeneric(error);
          });
    }
  }

  errorGeneric(error: Error): void {
    console.error('Error: ', error);
    if (error.message === '404') {
      this.snackBarService.error('Dados inválidos! Por favor digite novamente.');
    } else {
      this.snackBarService.error();
    }
  }

  changeForm(): boolean {
    let formValue: AccountObject = { ...this.form.value, id: this.profile.id };
    if (JSON.stringify(formValue) !== JSON.stringify(this.profile)) {
      confirm('Deseja sair dessa página?');
      //TODO: Implementar um dialog para informar se deseja sair da página ou não.
    }
    return true;
  }

  canDisable() {
    return this.changeForm();
  }

  goBack(): void {
    this.router.navigateByUrl('/payment', { state: [this.profile] });
  }

}
