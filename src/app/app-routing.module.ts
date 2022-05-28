import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./core/auth/auth.module').then((m) => m.AuthModule)
      },

      {
        path: '',
        loadChildren: () =>
          import('./core/shell/shell.module').then((m) => m.ShellModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
