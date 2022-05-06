import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SessionManagerService } from '../core/authentication/services/session-manager.service';
import { AuthenticationModule } from '../core/authentication/authentication.module';
import { ImageModule } from 'primeng/image';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    NavbarComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    AuthenticationModule,
    ButtonModule,
    ImageModule
  ],
  exports: [
    NavbarComponent,
    PageNotFoundComponent
  ],
  providers: [
    SessionManagerService
  ]
})
export class SharedModule { }
