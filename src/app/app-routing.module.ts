import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedGuard } from './shared/guards/notLogged/notLogged.guard';
import { IsLoggedGuard } from './shared/guards/isLogged/isLogged.guard';

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./blocked/blocked.module').then( m => m.BlockedModule),
      canActivate: [IsLoggedGuard]
    },
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then( m => m.LoginModule),
      canActivate: [NotLoggedGuard]
    },
    {
      path: '**',
      component: NotFoundComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }