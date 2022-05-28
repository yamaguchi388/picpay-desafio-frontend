import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

const PAGE_HEADER_TITLE = {
  meta: {
    title: 'Go To Loans - Customer Dashboard',
  },
};

const children = [
  {
    path: '',
    redirectTo: 'dashboard',
  },
];

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [GarageVerificationGuard, LenderRulesLoadedGuard],
    // canActivateChild: [MetaGuard],
    data: {
      meta: {
        title: 'Desafio Picpay Front-end - Dashboard',
      },
    },
    // children,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
