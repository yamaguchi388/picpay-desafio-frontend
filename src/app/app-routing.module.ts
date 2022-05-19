import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/guards.index';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
      path: 'login',
      loadChildren: () => import('./modules/login/login.module').then( m => m.LoginModule),
      canActivate: []
    },
    {
      path: 'home',
      loadChildren: () => import('./modules/home/home.module').then( m => m.HomeModule),
      canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }