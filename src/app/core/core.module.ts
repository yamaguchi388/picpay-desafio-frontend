import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './authentication/components/login/login.component';
import { ProfileComponent } from './authentication/views/profile/profile.component';



@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
