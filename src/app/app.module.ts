import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { MyPaymentsComponent } from './pages/my-payments/my-payments.component';
@NgModule({
  declarations: [	
    AppComponent, AccountsComponent, MyPaymentsComponent,
   ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
