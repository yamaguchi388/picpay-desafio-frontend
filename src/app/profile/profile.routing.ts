import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileGuard } from './../core/guards/profile.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivateChild: [ProfileGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  }
];

export const ProfileRoutes = RouterModule.forChild(routes);
