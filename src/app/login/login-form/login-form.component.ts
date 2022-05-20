import { SnackBarService } from './../../service/snack-bar.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { AccountObject } from './../../models/account-object';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form!: FormGroup;
  visibility!: boolean;
  btnText = 'entrar';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.get('email')?.value, this.form.get('password')?.value)
        .subscribe((result: AccountObject[]) => {
          this.router.navigateByUrl('/payment', { state: result });
        },
        (error: Error) => {
          if (error.message === '404') {
            this.snackBarService.error('Dados inválidos! Por favor digite novamente.');
          } else {
            this.snackBarService.error();
          }
        }
      );
    }
  }

}
