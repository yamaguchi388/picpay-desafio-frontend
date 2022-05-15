import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "meus-pagamentos"
  },
  {
    path: "meus-pagamentos",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../../features/my-payments/my-payments.module").then((m) => m.MyPaymentsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
