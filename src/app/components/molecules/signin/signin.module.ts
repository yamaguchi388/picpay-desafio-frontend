import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { SigninComponent } from "./signin.component";
import { SigninValidator } from "src/app/services/validators/signin.validator";
import { CreateUserFactory } from "src/app/factorys/create-user.factory";

@NgModule({
  declarations: [SigninComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SigninComponent],
  providers: [SigninValidator, CreateUserFactory],
})
export class SigninModule {}
