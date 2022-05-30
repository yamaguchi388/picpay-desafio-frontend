import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pay-friends',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'pay-friends',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'tasks' },
          {
            path: 'tasks',
            loadChildren: () =>
              import('./tasks/tasks.module').then((m) => m.TasksModule),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'pay-friends',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
