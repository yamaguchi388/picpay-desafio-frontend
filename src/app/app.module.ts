import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './shared/state-management/state.index';
import { AppRoutingModule } from './app-routing.module';
import { LoadingModule } from './shared/components/loading/loading.module';

@NgModule({
  declarations: [	
    AppComponent,
   ],
  imports: [
    LoadingModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
