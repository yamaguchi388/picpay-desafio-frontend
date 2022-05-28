import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './containers/main/main.component';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignOutComponent } from './containers/sign-out/sign-out.component';

export const signInChildren = [
  {
    path: '',
    component: SignInComponent,
    canActivate: [],
  },
];

export const routes: Routes = [
  {
    path: 'sign-out',
    component: SignOutComponent,
  },
  {
    path: 'sign-in',
    component: MainComponent,
    // canActivate: [LoggedInGuard],
    // canActivateChild: [MetaGuard],
    data: {
      meta: {
        title: 'Desafio Picpay Front-end - Sign In',
      },
    },
    children: signInChildren,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
