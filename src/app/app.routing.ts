import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { MyPaymentsComponent } from './../pages/my-payments/my-payments.component';
import { AuthGuard } from '../services/account/auth.guard';

const routes: Routes = [{
    path: '',
    component: MyPaymentsComponent,
    children: [
        { path: 'pagamentos', component: MyPaymentsComponent },
    ],
    canActivate: [AuthGuard]
    },
    { 
        path: '', 
        component: LoginComponent, 
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', component: LoginComponent }
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }