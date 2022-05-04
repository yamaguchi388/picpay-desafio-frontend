import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./sign-in.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SignInFormComponent } from "./shared/components/sign-in-form/sign-in-form.component";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { SignInFormModule } from "./shared/components/sign-in-form/sign-in-form.module";

const routes: Routes = [
  {
    path: "",
    component: SignInComponent,
  },
];

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SignInFormModule,
    MaterialModule,
  ],
})
export class SignInModule {}
