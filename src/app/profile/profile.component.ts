import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountObject } from './../models/account-object';
import { AuthService } from './../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  visibility!: boolean;
  profile!: AccountObject;
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.profile = history.state[0];
    if (!this.profile) {
      this.router.navigate(['/login']);
    }
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
        },
          error => {
            console.error('Error', error);
            throw new Error('Error not implemented.');
          });
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

  goBack(): void {
    this.router.navigateByUrl('/payment', { state: [this.profile] });
  }

}
