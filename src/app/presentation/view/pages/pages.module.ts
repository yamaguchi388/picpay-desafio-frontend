import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsModule } from './payments/payments.module';
import { LoginModule } from './login/login.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModule,
    PaymentsModule,
    PagesRoutingModule,
  ],
  exports: [PagesRoutingModule],
})
export class PagesModule {}
