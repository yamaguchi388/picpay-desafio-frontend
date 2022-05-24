import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { PaymentsComponent } from "./pages/payments/payments.component";

const appRoutes: Routes = [
  { path: "entrar", component: LoginComponent },
  { path: "pagamentos", component: PaymentsComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaymentsComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
