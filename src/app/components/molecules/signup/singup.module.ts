import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { SignupValidator } from "src/app/services/validators/signup.validator";
import { SignupComponent } from "./signup.component";
import { CreateUserFactory } from "src/app/factorys/create-user.factory";

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SignupComponent],
  providers: [SignupValidator, CreateUserFactory],
})
export class SignupModule {}
