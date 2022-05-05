import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/authentication/components/login/login.component';
import { MyPaymentsViewComponent } from './features/payments/views/my-payments-view/my-payments-view.component';

const routes: Routes = [
    {
        path: '',
        component: MyPaymentsViewComponent
    },
    {
        path: '/meuspagamentos',
        component: MyPaymentsViewComponent
    },
    {
        path:'/login',
        component: LoginComponent
    }
]; 

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}