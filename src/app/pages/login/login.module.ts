import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login.component";
import { SigninValidator } from "../../services/validators/signin.validator";

import { SigninModule } from "src/app/components/molecules/signin/signin.module";
import { SignupModule } from "src/app/components/molecules/signup/singup.module";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SigninModule,
    SignupModule,
    RouterModule.forChild(routes),
  ],
  providers: [SigninValidator],
  exports: [RouterModule],
})
export class LoginModule {}
