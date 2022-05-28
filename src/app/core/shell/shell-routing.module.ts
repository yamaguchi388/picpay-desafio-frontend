import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ROUTES } from '../../shared/consts/routes';
import { ShellComponent } from './shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: ROUTES.PAYMENTS,
        loadChildren: () =>
          import('../../payments/payments.module').then((m) => m.PaymentsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule {}
