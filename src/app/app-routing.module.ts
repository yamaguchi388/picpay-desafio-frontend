import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "sign-in",
    loadChildren: () =>
      import("./modules/sign-in/sign-in.module").then((m) => m.SignInModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./modules/payments/payments.module").then(
        (m) => m.PaymentsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
