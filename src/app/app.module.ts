import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { I18nModule } from './core/i18n/i18n/i18n.module';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    I18nModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
