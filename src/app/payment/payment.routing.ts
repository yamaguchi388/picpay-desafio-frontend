import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { PaymentGuard } from './../core/guards/payment.guard';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    canActivateChild: [PaymentGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  }
];

export const PaymentRoutes = RouterModule.forChild(routes);
