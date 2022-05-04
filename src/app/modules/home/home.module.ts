import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule, Routes } from "@angular/router";
import { HeaderModule } from "./shared/components/header/header.module";

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
})
export class HomeModule {}
