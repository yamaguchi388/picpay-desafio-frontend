import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AuthenticationModule
  ]
})
export class CoreModule { }
