import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccountsComponent } from './../pages/accounts/accounts.component';
import { MyPaymentsComponent } from './../pages/my-payments/my-payments.component';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from './../components/molecules/header/header.component';
@NgModule({
  declarations: [	
    AppComponent, AccountsComponent, MyPaymentsComponent, HeaderComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
