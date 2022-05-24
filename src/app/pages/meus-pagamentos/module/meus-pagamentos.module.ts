import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusPagamentosRoutingModule } from './meus-pagamentos-routing.module';
import { MeusPagamentosComponent } from '../meus-pagamentos.component';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from 'src/app/shared/state-management/effects/tasks.effects';
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [
    MeusPagamentosComponent
  ],
  imports: [
    CurrencyMaskModule,
    CommonModule,
    MeusPagamentosRoutingModule,
    EffectsModule.forRoot([
      TasksEffects
    ])
  ]
})
export class MeusPagamentosModule { }
