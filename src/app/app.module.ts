import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PaymentsModule } from './features/payments/payments.module';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { CommonModule } from '@angular/common';

// import { registerLocaleData } from '@angular/common';
// import localePT from '@angular/common/locales/pt';

// registerLocaleData(localePT);

@NgModule({
  declarations: [	
    AppComponent,
   ],
  imports: [
    BrowserModule,
    CommonModule,
    PaymentsModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
