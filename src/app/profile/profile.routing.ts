import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDeactivateGuard } from './../core/guards/profile-deactivate.guard';
import { ProfileGuard } from './../core/guards/profile.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivateChild: [ProfileGuard],
    canDeactivate: [ProfileDeactivateGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  }
];

export const ProfileRoutes = RouterModule.forChild(routes);
