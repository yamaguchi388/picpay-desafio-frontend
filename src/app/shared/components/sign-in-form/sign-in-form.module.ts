import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { SignInFormComponent } from "./sign-in-form.component";

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  declarations: [SignInFormComponent],
  exports: [SignInFormComponent],
  providers: [],
})
export class SignInFormModule {}
