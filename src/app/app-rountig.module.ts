import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CanActivatePortal } from "./guards/can-activate-portal";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "portal",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./features/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "portal",
    canActivate: [CanActivatePortal],
    loadChildren: () =>
      import("./core/layout/layout.module").then((m) => m.LayoutModule),
  },
  {
    path: "**",
    redirectTo: "portal",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivatePortal],
})
export class AppRoutingModule {}
