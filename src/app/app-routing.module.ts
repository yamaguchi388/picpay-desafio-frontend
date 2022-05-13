import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CockpitComponent } from './components/cockpit/cockpit.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyPaymentsComponent } from './components/my-payments/my-payments.component';
import { LoggedInGuard } from './services/guards/logged-in.guard';
import { LoggedOutGuard } from './services/guards/logged-out.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  {
    path: '',
    component: CockpitComponent, canActivate: [LoggedInGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'my-payments', component: MyPaymentsComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
