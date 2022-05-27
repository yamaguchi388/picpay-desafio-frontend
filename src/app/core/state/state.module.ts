import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../../environments/environment.prod';

@NgModule({
  imports: [
    NgxsModule.forRoot([], { developmentMode: !environment.production })
  ]
})
export class StateModule {}
