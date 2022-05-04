import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./sign-in.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SignInFormComponent } from "./components/sign-in-form/sign-in-form.component";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {
    path: "",
    component: SignInComponent,
  },
];

@NgModule({
  declarations: [SignInComponent, SignInFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class SignInModule {}
