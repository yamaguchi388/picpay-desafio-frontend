import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoModule } from '../../shared/components/logo/logo.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { ProfilePictureModule } from './../../shared/components/profile-picture/profile-picture.module';
import { ShellComponent } from './shell.component';
import { ShellRoutingModule } from './shell-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ShellComponent, NavbarComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    MatToolbarModule,
    LogoModule,
    FlexLayoutModule,
    ProfilePictureModule,
    MatMenuModule,
    MatIconModule,
    TranslateModule.forChild()
  ]
})
export class ShellModule {}
