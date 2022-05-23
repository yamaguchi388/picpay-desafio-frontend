import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteService } from '../route.service';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
  RouteService.withShell([
    { path: '', redirectTo: '/payments', pathMatch: 'full' },
    {
      path: 'payments',
      component: PaymentsComponent,
      data: {
        title: 'Meus Pagamentos'
      }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
