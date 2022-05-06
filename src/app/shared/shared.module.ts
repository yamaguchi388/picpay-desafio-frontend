import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SessionManagerService } from '../core/authentication/services/session-manager.service';
import { AuthenticationModule } from '../core/authentication/authentication.module';
import { ImageModule } from 'primeng/image';




@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    AuthenticationModule,
    ImageModule
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    SessionManagerService
  ]
})
export class SharedModule { }
