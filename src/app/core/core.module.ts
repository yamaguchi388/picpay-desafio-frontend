import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './authentication/views/login/login.component';
import { ProfileComponent } from './authentication/views/profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ]
})
export class CoreModule { }
