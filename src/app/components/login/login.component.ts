import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'picpay-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({});

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient,
    private snackbar: MatSnackBar,

  ) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  public login(): void {
    this.httpClient.get<any>('http://localhost:3000/account').subscribe(
      (response) => {
        const user = response.find((u: any) => {
          return (
            u.email === this.loginForm.value.email &&
            u.password === this.loginForm.value.password
          );
        });
        if (user) {
          this.snackbar.open('Login efetuado com sucesso', 'Fechar', {
            duration: 5000,
            panelClass: ['custom-snackbar']
          });
          this.loginForm.reset();
          this.router.navigate(['/payments']);
        } else {
          this.snackbar.open('Usuário ou Senha inválido', 'Fechar', {
            duration: 5000,
            panelClass: ['custom-snackbar']
          });
        }
      },
      (_err) => {
        alert('Erro ao efetuar login!');
      }
    );
  }
}
