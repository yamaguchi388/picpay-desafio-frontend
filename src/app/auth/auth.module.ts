import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { MainComponent } from './containers/main/main.component';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { AuthRoutingModule } from './auth.routing.module';
import { SignOutComponent } from './containers/sign-out/sign-out.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';

@NgModule({
  declarations: [
    MainComponent,
    SignInComponent,
    SignOutComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects),
    AuthRoutingModule,
    SharedModule,
  ],
})
export class AuthModule {}
