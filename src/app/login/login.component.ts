import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = false;

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  login() {
    const { value } = this.form;
    this.authService.login(value).subscribe(
      () => this.router.navigateByUrl('/pay-friends'),
      (error: Error) => console.error(error)
    );
  }

  getEmailErrorMessage(): string {
    if (this.form.get('email').hasError('required')) {
      return 'Por favor insira um email!';
    }

    return (
      this.form.get('email').hasError('email') &&
      'Por favor insira um email válido!'
    );
  }

  getPasswordErrorMessage(): string {
    return (
      this.form.get('password').hasError('required') &&
      'Por favor insira uma senha!'
    );
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
