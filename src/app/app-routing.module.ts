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
      import("./modules/home/home.module").then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
