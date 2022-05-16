import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { FetchPaymentsComponent } from "./components/payments/fetch-payments.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'payments',
    component: FetchPaymentsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }