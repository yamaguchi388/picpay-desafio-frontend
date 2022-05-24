import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeusPagamentosResolver } from './pages/meus-pagamentos/resolver/meus-pagamentos.resolver';

const routes: Routes = [
    { 
        path: 'meus-pagamentos', 
        loadChildren: () => import('./pages/meus-pagamentos/module/meus-pagamentos.module').then(m => m.MeusPagamentosModule),
        resolve: [ MeusPagamentosResolver ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }