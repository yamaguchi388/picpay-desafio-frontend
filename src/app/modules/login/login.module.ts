import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const COMPONENTS = [
  LoginComponent,
  LoginFormComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, RouterModule, SharedModule],
})
export class LoginModule {}
