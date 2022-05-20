import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfileRoutes } from './profile.routing';
import { ProfileDeactivateGuard } from './../core/guards/profile-deactivate.guard';
import { ProfileGuard } from './../core/guards/profile.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ProfileRoutes
  ],
  declarations: [ProfileComponent],
  providers: [ProfileGuard, ProfileDeactivateGuard]
})
export class ProfileModule { }
