import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PresentationModule } from './presentation/presentation.module';
import { DataModule } from './data/data.module';
import { InfraModule } from './infra/infra.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    DataModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    InfraModule,
    PresentationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
