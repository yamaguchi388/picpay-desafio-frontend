import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localePT from "@angular/common/locales/pt";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-rountig.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

registerLocaleData(localePT);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [Title, { provide: LOCALE_ID, useValue: "pt-br" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
