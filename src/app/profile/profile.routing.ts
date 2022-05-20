import { ProfileResolver } from './../core/guards/profile.resolver';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileCanDeactivateGuard } from '../core/guards/profile-candeactivate.guard';
import { ProfileGuard } from '../core/guards/profile.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivateChild: [ProfileGuard],
    canDeactivate: [ProfileCanDeactivateGuard],
    resolve: { profile: ProfileResolver }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  }
];

export const ProfileRoutes = RouterModule.forChild(routes);
