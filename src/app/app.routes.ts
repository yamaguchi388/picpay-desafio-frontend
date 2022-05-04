import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/authentication/views/login/login.component';
import { ProfileComponent } from './core/authentication/views/profile/profile.component';
import { MyPaymentsViewComponent } from './features/payments/views/my-payments-view/my-payments-view.component';

const routes: Routes = [
    {
        path: '',
        component: MyPaymentsViewComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
]; 

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}