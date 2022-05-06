import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { SessionManagerService } from 'src/app/core/authentication/services/session-manager.service';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';



@NgModule({
  declarations: [
    ProfileViewComponent
  ],
  imports: [
    AvatarModule,
    AvatarGroupModule,
  ],
  exports: [
    ProfileViewComponent
  ],
  providers: [
    SessionManagerService
  ]
})
export class ProfileModule { }
