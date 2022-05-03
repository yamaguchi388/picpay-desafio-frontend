import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./blocked/blocked.module').then( m => m.BlockedModule),
    },
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then( m => m.LoginModule),
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