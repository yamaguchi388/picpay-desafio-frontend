import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/authentication/components/login/login.component';
import { AuthGuard } from './core/authentication/guards/auth.guard';
import { NotAuthGuard } from './core/authentication/guards/not-auth.guard';
import { MyPaymentsViewComponent } from './features/payments/views/my-payments-view/my-payments-view.component';
import { ProfileViewComponent } from './features/profile/profile-view/profile-view.component';
import { WelcomeLoginViewComponent } from './features/welcome-login-view/welcome-login-view.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path:'login',
        component: WelcomeLoginViewComponent,
        canActivate: [NotAuthGuard]
    },
    {
        path: 'meuspagamentos',
        component: MyPaymentsViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '/meuspagamentos',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        pathMatch: 'full'
    }
]; 

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}