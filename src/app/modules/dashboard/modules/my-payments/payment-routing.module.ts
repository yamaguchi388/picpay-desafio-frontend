import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPaymentsComponent } from './components/list-payment/list-payment.component';
import { PaymentComponent } from './payment.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    children: [
      {
        path: '',
        component: ListPaymentsComponent,
      },
      // {
      //   path: 'detalhes',
      //   component: PaymentDetailsComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
