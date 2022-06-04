import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthModule } from "./auth/auth.module";
import { LoginComponent } from "./pages/login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: "login", component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent],
})
export class CoreModule {}
