import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from "primeng/password";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';



@NgModule({
  declarations: [
    LoginComponent,
    LogoutButtonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule
  ]
})
export class AuthenticationModule { }
