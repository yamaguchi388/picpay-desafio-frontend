import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeusPagamentosComponent } from '../meus-pagamentos.component';

const routes: Routes = [{ path: '', component: MeusPagamentosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeusPagamentosRoutingModule { }
