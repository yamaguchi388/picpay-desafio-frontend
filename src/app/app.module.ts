import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [	
    AppComponent, NotFoundComponent,
   ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
