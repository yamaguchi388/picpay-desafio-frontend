import { NgModule } from '@angular/core';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../../environments/environment.prod';

@NgModule({
  imports: [
    NgxsLoggerPluginModule.forRoot(),
    NgxsModule.forRoot([], { developmentMode: !environment.production })
  ]
})
export class StateModule {}
