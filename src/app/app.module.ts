import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { pt_BR } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import pt from "@angular/common/locales/pt";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import localeBr from "@angular/common/locales/pt";

registerLocaleData(localeBr, "pt");

registerLocaleData(pt);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: LOCALE_ID, useValue: "pt" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
