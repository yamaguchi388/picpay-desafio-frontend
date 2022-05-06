import { NgModule } from '@angular/core';
import { AuthenticationModule } from '../core/authentication/authentication.module';
import { CoreModule } from '../core/core.module';
import { WelcomeLoginViewComponent } from './welcome-login-view/welcome-login-view.component';



@NgModule({
  declarations: [
    WelcomeLoginViewComponent
  ],
  imports: [
    AuthenticationModule
  ],
  exports: [
    WelcomeLoginViewComponent
  ]
})
export class FeaturesModule { }
