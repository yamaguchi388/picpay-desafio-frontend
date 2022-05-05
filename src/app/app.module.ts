import { BlockedModule } from './blocked/blocked.module';
import { LoginModule } from './login/login.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [	
    AppComponent, NotFoundComponent,
   ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    BlockedModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
