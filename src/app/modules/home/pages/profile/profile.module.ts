import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { InputModule } from "src/app/shared/components/form/input/input.module";

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
  },
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    InputModule,
  ],
})
export class ProfileModule {}
