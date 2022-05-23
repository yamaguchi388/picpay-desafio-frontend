import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'picpay-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('userNameInput')
  public userNameInput: ElementRef<HTMLInputElement>;
  public loginForm = new FormGroup({});
  public hide = true;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login() {
    this.authService.authenticate(this.loginForm.value).subscribe(
      ([user]) => {
        this.authService.setUser(user);
        this.router.navigate(['payments']);
        this.snackbar.open('Login efetuado com sucesso!', 'Fechar', {
          duration: 2000,
          panelClass: ['custom-snackbar'],
        });
      },
      (err: HttpErrorResponse) => {
        this.snackbar.open('Email ou Senha incorretos', 'Fechar', {
          duration: 2000,
          panelClass: ['custom-snackbar'],
        });
      }
    );
  }
}
