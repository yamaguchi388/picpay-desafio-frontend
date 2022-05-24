import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusPagamentosRoutingModule } from './meus-pagamentos-routing.module';
import { MeusPagamentosComponent } from '../meus-pagamentos.component';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from 'src/app/shared/state-management/effects/tasks.effects';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { PaymentModule } from 'src/app/shared/components/payment/payment.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { PagamentosFormComponent } from '../pagamentos-form/pagamentos-form.component';
import { DeletarPagamentoComponent } from '../deletar-pagamento/deletar-pagamento.component';
import { NoPaymentsModule } from 'src/app/shared/components/no-payments/no-payments.module';

@NgModule({
  declarations: [
    MeusPagamentosComponent,
    PagamentosFormComponent,
    DeletarPagamentoComponent
  ],
  imports: [
    CurrencyMaskModule,
    NoPaymentsModule,
    CommonModule,
    HeaderModule,
    PaymentModule,
    ReactiveFormsModule,
    PaginationModule,
    MeusPagamentosRoutingModule,
    EffectsModule.forRoot([
      TasksEffects
    ])
  ]
})
export class MeusPagamentosModule { }
