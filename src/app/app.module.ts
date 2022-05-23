import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common'; // necessário a partir do Angular v5
import ptBr from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './features/login/login.module';
import { HomeModule } from './features/home/home.module';
import { ProfileModule } from './features/profile/profile.module';
import { SharedModule } from './shared/shared.module';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // Shared Module
    SharedModule,
    LoginModule,
    HomeModule,
    ProfileModule,
  ],
  exports: [],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
