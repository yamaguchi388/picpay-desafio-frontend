import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import localeBr from "@angular/common/locales/pt";

import { HomeComponent } from "./home.component";
import { RouterModule, Routes } from "@angular/router";
import { HeaderModule } from "src/app/shared/components/header/header.module";

registerLocaleData(localeBr, "pt");

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        redirectTo: "payments",
      },
      {
        path: "payments",
        loadChildren: () =>
          import("./pages/payments/payments.module").then(
            (m) => m.PaymentsModule
          ),
      },
      { path: "**", redirectTo: "" },
    ],
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), HeaderModule],
  providers: [{ provide: LOCALE_ID, useValue: "pt" }],
})
export class HomeModule {}
