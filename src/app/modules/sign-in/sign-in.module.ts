import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./sign-in.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { SignInFormModule } from "src/app/shared/components/sign-in-form/sign-in-form.module";

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
