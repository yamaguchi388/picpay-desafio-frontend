import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { 
        path: 'meus-pagamentos', 
        loadChildren: () => import('./pages/meus-pagamentos/module/meus-pagamentos.module').then(m => m.MeusPagamentosModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }