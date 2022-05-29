//import { AuthState } from './states/auth.state';
import { AuthState } from './states/auth.state';
import { NgModule } from '@angular/core';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { PaymentState } from './states/payment.state';
import { environment } from 'src/environments/environment.prod';

const states = [PaymentState, AuthState];

@NgModule({
  imports: [
    NgxsLoggerPluginModule.forRoot(),
    NgxsModule.forRoot(states, { developmentMode: !!environment.production }),
    NgxsDispatchPluginModule.forRoot()
  ],
  exports: [NgxsLoggerPluginModule, NgxsModule, NgxsDispatchPluginModule]
})
export class StateModule {}
