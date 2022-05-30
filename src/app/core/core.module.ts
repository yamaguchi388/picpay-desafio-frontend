import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoggedGuard } from './guards/logged/logged.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  exports: [],
  providers: [AuthGuard, LoggedGuard],
})
export class CoreModule {}
