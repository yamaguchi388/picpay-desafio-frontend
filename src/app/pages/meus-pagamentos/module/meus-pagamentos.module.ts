import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusPagamentosRoutingModule } from './meus-pagamentos-routing.module';
import { MeusPagamentosComponent } from '../meus-pagamentos.component';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from 'src/app/shared/state-management/effects/tasks.effects';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { PaymentModule } from 'src/app/shared/components/payment/payment.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';

@NgModule({
  declarations: [
    MeusPagamentosComponent
  ],
  imports: [
    CurrencyMaskModule,
    CommonModule,
    HeaderModule,
    PaymentModule,
    PaginationModule,
    MeusPagamentosRoutingModule,
    EffectsModule.forRoot([
      TasksEffects
    ])
  ]
})
export class MeusPagamentosModule { }
