import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  }
];

export const ProfileRoutes = RouterModule.forChild(routes);
