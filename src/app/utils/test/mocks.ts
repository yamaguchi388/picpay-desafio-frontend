import { HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

export const commonMock = [
  RouterModule.forRoot([]),
  EffectsModule.forRoot([]),
  StoreModule.forRoot({}),
  HttpClientModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  NoopAnimationsModule,
];
