import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule]
})
export class AuthModule {}
