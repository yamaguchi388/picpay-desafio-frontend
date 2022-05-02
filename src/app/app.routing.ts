import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './../pages/accounts/accounts.component';
import { MyPaymentsComponent } from './../pages/my-payments/my-payments.component';

const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'login', component: AccountsComponent },
    { path: 'pagamentos', component: MyPaymentsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }