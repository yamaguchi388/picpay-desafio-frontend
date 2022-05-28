import { Routes } from '@angular/router';
import { DASHBOARD_BASE_ROUTE } from './dashboard/route';

export const AppRoutes: Routes = [
  {
    path: DASHBOARD_BASE_ROUTE,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
  },
  {
    path: '**',
    redirectTo: '/sign-in',
  },
];
