import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoModule } from '../../shared/components/logo/logo.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import { ShellRoutingModule } from './shell-routing.module';

@NgModule({
  declarations: [ShellComponent, NavbarComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    MatToolbarModule,
    LogoModule,
    FlexLayoutModule
  ]
})
export class ShellModule {}
