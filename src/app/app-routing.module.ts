import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/shell/auth.guard';
import { NgModule } from '@angular/core';
import { ROUTES } from './shared/consts/routes';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: ROUTES.AUTH,
        loadChildren: () =>
          import('./core/auth/auth.module').then((m) => m.AuthModule)
      },
      {
        path: '',
        loadChildren: () =>
          import('./core/shell/shell.module').then((m) => m.ShellModule)
        // canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
