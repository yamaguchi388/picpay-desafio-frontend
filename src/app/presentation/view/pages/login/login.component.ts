import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/domain/entity/user-entity';
import { IUsersController } from 'src/app/domain/interfaces/controllers/iusers-controller';
import { AuthService } from 'src/app/infra/auth/auth.service';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userController: IUsersController,
    private authService: AuthService,
    private notification: NotificationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  login(): void {
    this.userController
      .login(this.loginForm.value)
      .subscribe((user: UserEntity[]) => this.loginResponse(user[0]));
  }

  loginResponse(user: UserEntity): void {
    console.log(user);
    if (user?.token) {
      this.authService.credentials = user;
      this.router.navigateByUrl('/');
    } else {
      this.notification.open('Usuário ou senha inválidos', 'Fechar');
    }
  }
}
