import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localePT from "@angular/common/locales/pt";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-rountig.module";
import { HttpClientModule } from "@angular/common/http";

registerLocaleData(localePT);
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-br" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
